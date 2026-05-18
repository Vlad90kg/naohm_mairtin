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
                'title' => 'Club History',
                'slug' => 'history',
                'subtitle' => 'Naomh Mairtin CPG & LGFA milestones, stories, and legacy.',
                'intro_text' => 'Use this page to manage club history, milestones, and notable figures using flexible sections.',
                'hero_image' => null,
                'is_published' => true,
            ],
            [
                'title' => 'Facilities',
                'slug' => 'facilities',
                'subtitle' => 'Grounds, clubhouse, and training facilities.',
                'intro_text' => 'Use flexible sections to present facility images, descriptions, and updates.',
                'hero_image' => null,
                'is_published' => true,
            ],
            [
                'title' => 'Gaelic for Mothers and Others (G4MO)',
                'slug' => 'g4mo',
                'subtitle' => 'Social football for women who want to stay active and connected.',
                'intro_text' => 'Add group updates, session info, photos, and key details using flexible sections.',
                'hero_image' => null,
                'is_published' => true,
            ],
            [
                'title' => 'Gaelic for Dads and Lads (G4DL)',
                'slug' => 'g4dl',
                'subtitle' => 'Social football for men in a relaxed club setting.',
                'intro_text' => 'Add group updates, session info, photos, and key details using flexible sections.',
                'hero_image' => null,
                'is_published' => true,
            ],
            [
                'title' => 'Furious but not Fast',
                'slug' => 'furious-but-not-fast',
                'subtitle' => 'A social running group focused on consistency and encouragement.',
                'intro_text' => 'Add group updates, routes, schedules, and photos using flexible sections.',
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
            ->whereIn('slug', ['history', 'facilities', 'g4mo', 'g4dl', 'furious-but-not-fast'])
            ->delete();
    }
};
