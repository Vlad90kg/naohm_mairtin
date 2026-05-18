<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ExportMysqlDataSql extends Command
{
    protected $signature = 'app:export-mysql-data-sql {--path=storage/app/exports/mysql-data.sql}';

    protected $description = 'Export current application data as MySQL-compatible INSERT SQL.';

    /**
     * Tables included here should already exist in MySQL via Laravel migrations.
     * Order matters for foreign keys.
     */
    private const TABLES = [
        'users',
        'sponsors',
        'teams',
        'fixtures',
        'results',
        'events',
        'shop_page_contents',
        'shop_items',
        'content_pages',
        'content_sections',
        'content_section_images',
        'committee_sections',
        'committee_members',
    ];

    public function handle(): int
    {
        $outputPath = base_path($this->option('path'));
        File::ensureDirectoryExists(dirname($outputPath));

        $sql = [];
        $sql[] = '-- MySQL data export generated from local SQLite-backed Laravel data';
        $sql[] = '-- Import only after running Laravel migrations on the target MySQL database.';
        $sql[] = '-- This file does not include storage/app/private/cms/page-content.json or uploaded files.';
        $sql[] = 'SET FOREIGN_KEY_CHECKS=0;';
        $sql[] = '';

        foreach (self::TABLES as $table) {
            $rows = DB::table($table)->get()->map(fn ($row) => (array) $row)->all();

            $sql[] = sprintf('-- %s (%d rows)', $table, count($rows));
            $sql[] = sprintf('DELETE FROM `%s`;', $table);

            if ($rows !== []) {
                $columns = array_keys($rows[0]);
                $columnList = implode(', ', array_map(fn ($column) => sprintf('`%s`', $column), $columns));

                foreach (array_chunk($rows, 250) as $chunk) {
                    $values = [];

                    foreach ($chunk as $row) {
                        $rowValues = [];

                        foreach ($columns as $column) {
                            $rowValues[] = $this->toSqlLiteral($row[$column] ?? null);
                        }

                        $values[] = '(' . implode(', ', $rowValues) . ')';
                    }

                    $sql[] = sprintf(
                        'INSERT INTO `%s` (%s) VALUES' . PHP_EOL . '%s;',
                        $table,
                        $columnList,
                        implode(',' . PHP_EOL, $values),
                    );
                }
            }

            $sql[] = '';
        }

        $sql[] = 'SET FOREIGN_KEY_CHECKS=1;';
        $sql[] = '';

        File::put($outputPath, implode(PHP_EOL, $sql));

        $this->info("Exported MySQL data SQL to: {$outputPath}");

        return self::SUCCESS;
    }

    private function toSqlLiteral(mixed $value): string
    {
        if ($value === null) {
            return 'NULL';
        }

        if (is_bool($value)) {
            return $value ? '1' : '0';
        }

        if (is_int($value) || is_float($value)) {
            return (string) $value;
        }

        $string = (string) $value;
        $string = str_replace('\\', '\\\\', $string);
        $string = str_replace("'", "\\'", $string);
        $string = str_replace("\r", '\\r', $string);
        $string = str_replace("\n", '\\n', $string);
        $string = str_replace("\0", '\\0', $string);

        return "'{$string}'";
    }
}
