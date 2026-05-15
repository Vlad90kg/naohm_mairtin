<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('teams', 'sort_order')) {
            Schema::table('teams', function (Blueprint $table) {
                $table->unsignedInteger('sort_order')->nullable()->after('senior_group');
                $table->index('sort_order');
            });
        }

        if (! DB::table('content_pages')->where('slug', 'scor')->exists()) {
            $now = now();

            $scorPageId = DB::table('content_pages')->insertGetId([
                'title' => 'Scór',
                'slug' => 'scor',
                'subtitle' => 'Celebrating music, song, dance, storytelling, and quiz in the GAA tradition.',
                'intro_text' => 'Use this page to manage Scór news, achievements, and upcoming cultural activities.',
                'hero_image' => null,
                'is_published' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            DB::table('content_sections')->insert([
                [
                    'content_page_id' => $scorPageId,
                    'title' => 'About Scór',
                    'body' => 'Scór combines the spirit of the GAA with Irish cultural tradition. Update this section with club-specific Scór activity and participation details.',
                    'image' => null,
                    'image_position' => 'none',
                    'layout_type' => 'text_only',
                    'order' => 1,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'content_page_id' => $scorPageId,
                    'title' => 'Activities',
                    'body' => 'Add editable content for music, singing, dancing, storytelling, and quiz categories as needed.',
                    'image' => null,
                    'image_position' => 'none',
                    'layout_type' => 'text_only',
                    'order' => 2,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
            ]);
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('teams', 'sort_order')) {
            Schema::table('teams', function (Blueprint $table) {
                $table->dropIndex(['sort_order']);
                $table->dropColumn('sort_order');
            });
        }
    }
};
