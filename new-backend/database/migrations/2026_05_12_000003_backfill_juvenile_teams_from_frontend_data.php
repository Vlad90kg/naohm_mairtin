<?php

use App\Enums\TeamCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        $teams = [
            [
                'name' => 'U17 Boys',
                'slug' => 'u17-boys',
                'managers' => [
                    ['role' => 'Lead Coach', 'name' => 'Paul Connor', 'phone' => '087 000 1111', 'email' => null],
                ],
                'training_times' => ['Tuesdays: 6:30 PM'],
            ],
            [
                'name' => 'U15 Boys',
                'slug' => 'u15-boys',
                'managers' => [
                    ['role' => 'Lead Coach', 'name' => 'Seamus Quinn', 'phone' => null, 'email' => null],
                ],
                'training_times' => ['Mondays: 6:00 PM'],
            ],
            [
                'name' => 'U13 Boys',
                'slug' => 'u13-boys',
                'managers' => [
                    ['role' => 'Lead Coach', 'name' => 'David Kelly', 'phone' => null, 'email' => null],
                ],
                'training_times' => ['Wednesdays: 6:30 PM'],
            ],
            [
                'name' => 'U12 Girls',
                'slug' => 'u12-girls',
                'managers' => [
                    ['role' => 'Lead Coach', 'name' => 'Laura Brennan', 'phone' => null, 'email' => null],
                ],
                'training_times' => ['Fridays: 6:00 PM'],
            ],
        ];

        foreach ($teams as $team) {
            $existing = DB::table('teams')
                ->where('slug', $team['slug'])
                ->orWhere('name', $team['name'])
                ->first();

            $payload = [
                'name' => $team['name'],
                'slug' => $team['slug'] ?: Str::slug($team['name']),
                'category' => TeamCategory::Juvenile->value,
                'senior_group' => null,
                'description' => null,
                'managers' => json_encode($team['managers'], JSON_UNESCAPED_SLASHES),
                'training_times' => json_encode($team['training_times'], JSON_UNESCAPED_SLASHES),
                'contact_email' => null,
                'is_internal' => true,
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('teams')
                    ->where('id', $existing->id)
                    ->update($payload);

                continue;
            }

            DB::table('teams')->insert([
                ...$payload,
                'image' => null,
                'created_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        DB::table('teams')
            ->whereIn('slug', ['u17-boys', 'u15-boys', 'u13-boys', 'u12-girls'])
            ->delete();
    }
};
