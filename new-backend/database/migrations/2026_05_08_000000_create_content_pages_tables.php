<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_pages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('subtitle')->nullable();
            $table->text('intro_text')->nullable();
            $table->string('hero_image')->nullable();
            $table->boolean('is_published')->default(false);
            $table->timestamps();
        });

        Schema::create('content_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('content_page_id')->constrained()->cascadeOnDelete();
            $table->string('title')->nullable();
            $table->longText('body')->nullable();
            $table->string('image')->nullable();
            $table->string('image_position')->default('none');
            $table->string('layout_type')->default('text_only');
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('content_section_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('content_section_id')->constrained()->cascadeOnDelete();
            $table->string('image');
            $table->string('caption')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        $now = now();

        if (! DB::table('content_pages')->where('slug', 'health-wellbeing')->exists()) {
            $healthPageId = DB::table('content_pages')->insertGetId([
                'title' => 'Health & Wellbeing',
                'slug' => 'health-wellbeing',
                'subtitle' => 'Supporting the mental and physical health of our community.',
                'intro_text' => null,
                'hero_image' => 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80',
                'is_published' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            DB::table('content_sections')->insert([
                [
                    'content_page_id' => $healthPageId,
                    'title' => 'Healthy Club Project',
                    'body' => 'The Healthy Club Project is an initiative by the GAA to make our club a hub for health and wellbeing in our community. We focus on physical activity, mental fitness, healthy eating, and drug/alcohol awareness.',
                    'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
                    'image_position' => 'right',
                    'layout_type' => 'image_text',
                    'order' => 1,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'content_page_id' => $healthPageId,
                    'title' => 'Mental Health Awareness',
                    'body' => 'We are committed to supporting the mental fitness of all our members. Our club provides resources and runs workshops to help normalize conversations around mental health.',
                    'image' => 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee1?w=800&q=80',
                    'image_position' => 'left',
                    'layout_type' => 'image_text',
                    'order' => 2,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
            ]);
        }

        if (! DB::table('content_pages')->where('slug', 'culture')->exists()) {
            $culturePageId = DB::table('content_pages')->insertGetId([
                'title' => 'Culture & Heritage',
                'slug' => 'culture',
                'subtitle' => 'Celebrating our Irish identity through language, music, and dance.',
                'intro_text' => null,
                'hero_image' => null,
                'is_published' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            DB::table('content_sections')->insert([
                [
                    'content_page_id' => $culturePageId,
                    'title' => 'Scór',
                    'body' => 'Scór is a GAA competition that combines all the colour and excitement of Gaelic games with the magic of Irish traditional culture. We encourage all members to participate in music, song, dance, and drama.',
                    'image' => 'https://images.unsplash.com/photo-1535970790272-af05f54077d5?w=800&q=80',
                    'image_position' => 'right',
                    'layout_type' => 'image_text',
                    'order' => 1,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'content_page_id' => $culturePageId,
                    'title' => 'Irish Language',
                    'body' => 'The promotion of the Irish language is central to our club\'s identity. We host language classes and encourage the use of Gaeilge in our daily club activities.',
                    'image' => 'https://images.unsplash.com/photo-1590076214667-c0f33b98c442?w=800&q=80',
                    'image_position' => 'left',
                    'layout_type' => 'image_text',
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
        Schema::dropIfExists('content_section_images');
        Schema::dropIfExists('content_sections');
        Schema::dropIfExists('content_pages');
    }
};
