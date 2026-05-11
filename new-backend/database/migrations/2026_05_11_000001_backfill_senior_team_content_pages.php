<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (! DB::getSchemaBuilder()->hasTable('content_pages')) {
            return;
        }

        $now = now();

        $pages = [
            [
                'title' => 'Senior Men',
                'slug' => 'senior-men',
                'subtitle' => 'Manage senior men team information and updates.',
                'intro_text' => 'Add optional extra content sections for senior men: announcements, imagery, and seasonal updates.',
                'hero_image' => null,
                'is_published' => true,
            ],
            [
                'title' => 'Senior Ladies',
                'slug' => 'senior-ladies',
                'subtitle' => 'Manage senior ladies team information and updates.',
                'intro_text' => 'Add optional extra content sections for senior ladies: announcements, imagery, and seasonal updates.',
                'hero_image' => null,
                'is_published' => true,
            ],
        ];

        foreach ($pages as $page) {
            if (! DB::table('content_pages')->where('slug', $page['slug'])->exists()) {
                DB::table('content_pages')->insert([
                    ...$page,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }

    public function down(): void
    {
        if (! DB::getSchemaBuilder()->hasTable('content_pages')) {
            return;
        }

        DB::table('content_pages')
            ->whereIn('slug', ['senior-men', 'senior-ladies'])
            ->delete();
    }
};

