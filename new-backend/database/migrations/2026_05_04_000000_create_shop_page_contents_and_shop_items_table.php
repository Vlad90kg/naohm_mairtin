<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shop_page_contents', function (Blueprint $table) {
            $table->id();
            $table->string('hero_eyebrow', 80)->default('Official Club Stores');
            $table->string('hero_title', 200)->default('Club Shop');
            $table->string('hero_highlight', 80)->default('Shop');
            $table->text('hero_description');
            $table->string('info_title', 200)->default('Need Help with an Order?');
            $table->text('info_description');
            $table->string('info_button_text', 80)->default('Contact the Club');
            $table->string('info_button_link', 255)->default('/contact');
            $table->timestamps();
        });

        Schema::create('shop_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_content_id')->constrained('shop_page_contents')->cascadeOnDelete();
            $table->string('name', 200);
            $table->string('description', 255);
            $table->text('detail')->nullable();
            $table->string('url', 255)->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_logo')->default(false);
            $table->string('cta', 80)->default('Visit Shop');
            $table->boolean('is_placeholder')->default(false);
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        $pageContentId = DB::table('shop_page_contents')->insertGetId([
            'hero_eyebrow' => 'Official Club Stores',
            'hero_title' => 'Club Shop',
            'hero_highlight' => 'Shop',
            'hero_description' => 'Support Naomh Mairtin CPG by purchasing official gear and merchandise through our approved retail partners.',
            'info_title' => 'Need Help with an Order?',
            'info_description' => 'For queries about club orders, sizes, or custom printing, contact the club directly or reach out to our retail partners using the links above.',
            'info_button_text' => 'Contact the Club',
            'info_button_link' => '/contact',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('shop_items')->insert([
            [
                'page_content_id' => $pageContentId,
                'name' => "O'Neills",
                'description' => 'Official Club Gear & Leisurewear',
                'detail' => "Browse and order official Naomh Mairtin CPG jerseys, training gear, and leisurewear directly from O'Neills - the GAA's trusted kit supplier.",
                'url' => 'https://www.oneills.com/catalogsearch/result/?q=naomh+mairtin',
                'image' => null,
                'is_logo' => false,
                'cta' => 'Shop O\'Neills',
                'is_placeholder' => false,
                'order' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'page_content_id' => $pageContentId,
                'name' => 'Clear Cut Marketing',
                'description' => 'Official Club Merchandise & Apparel',
                'detail' => 'Personalised club merchandise, custom apparel, and supporter gear from our local marketing and print partner, Clear Cut Marketing.',
                'url' => 'https://clearcutmarketing.ie/',
                'image' => null,
                'is_logo' => true,
                'cta' => 'Shop Clear Cut',
                'is_placeholder' => false,
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'page_content_id' => $pageContentId,
                'name' => 'Future Supplier',
                'description' => 'Coming Soon',
                'detail' => 'We are always looking to expand our range of official club gear. Stay tuned for new partnerships and exciting new merchandise options.',
                'url' => null,
                'image' => null,
                'is_logo' => false,
                'cta' => 'Coming Soon',
                'is_placeholder' => true,
                'order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('shop_items');
        Schema::dropIfExists('shop_page_contents');
    }
};
