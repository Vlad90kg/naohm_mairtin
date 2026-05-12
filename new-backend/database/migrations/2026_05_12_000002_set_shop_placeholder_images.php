<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('shop_items')) {
            return;
        }

        DB::table('shop_items')
            ->whereRaw('LOWER(name) = ?', ["o'neills"])
            ->where(function ($query) {
                $query->whereNull('image')->orWhere('image', '');
            })
            ->update([
                'image' => '/shop-assets/oneills-placeholder.svg',
                'updated_at' => now(),
            ]);

        DB::table('shop_items')
            ->whereRaw('LOWER(name) = ?', ['clear cut marketing'])
            ->where(function ($query) {
                $query->whereNull('image')->orWhere('image', '');
            })
            ->update([
                'image' => '/shop-assets/clear-cut-marketing-placeholder.svg',
                'updated_at' => now(),
            ]);
    }

    public function down(): void
    {
        DB::table('shop_items')
            ->whereIn('image', [
                '/shop-assets/oneills-placeholder.svg',
                '/shop-assets/clear-cut-marketing-placeholder.svg',
            ])
            ->update([
                'image' => null,
                'updated_at' => now(),
            ]);
    }
};
