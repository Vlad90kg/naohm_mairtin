<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('shop_page_contents') || ! Schema::hasTable('shop_items')) {
            return;
        }

        $legacyPath = storage_path('app/private/cms/page-content.json');

        if (! is_file($legacyPath)) {
            return;
        }

        $decoded = json_decode(file_get_contents($legacyPath), true);
        $legacyShop = is_array($decoded) ? ($decoded['shop'] ?? null) : null;

        if (! is_array($legacyShop)) {
            return;
        }

        $content = DB::table('shop_page_contents')->first();

        if ($content && ! $this->shouldReplaceExistingContent((array) $content)) {
            return;
        }

        DB::transaction(function () use ($content, $legacyShop) {
            $contentFields = [
                'hero_eyebrow' => $legacyShop['hero_eyebrow'] ?? 'Official Club Stores',
                'hero_title' => $legacyShop['hero_title'] ?? 'Club Shop',
                'hero_highlight' => $legacyShop['hero_highlight'] ?? 'Shop',
                'hero_description' => $legacyShop['hero_description'] ?? '',
                'info_title' => $legacyShop['info_title'] ?? 'Need Help with an Order?',
                'info_description' => $legacyShop['info_description'] ?? '',
                'info_button_text' => $legacyShop['info_button_text'] ?? 'Contact the Club',
                'info_button_link' => $legacyShop['info_button_link'] ?? '/contact',
                'updated_at' => now(),
            ];

            if ($content) {
                DB::table('shop_page_contents')
                    ->where('id', $content->id)
                    ->update($contentFields);
                $pageContentId = $content->id;
                DB::table('shop_items')->where('page_content_id', $pageContentId)->delete();
            } else {
                $pageContentId = DB::table('shop_page_contents')->insertGetId([
                    ...$contentFields,
                    'created_at' => now(),
                ]);
            }

            $shops = array_values(array_filter($legacyShop['shops'] ?? [], 'is_array'));

            if ($shops === []) {
                return;
            }

            DB::table('shop_items')->insert(array_map(
                fn (array $shop, int $index): array => [
                    'page_content_id' => $pageContentId,
                    'name' => $shop['name'] ?? '',
                    'description' => $shop['description'] ?? '',
                    'detail' => $shop['detail'] ?? '',
                    'url' => ($shop['url'] ?? '') ?: null,
                    'image' => $this->resolveFallbackImagePath($shop),
                    'is_logo' => (bool) ($shop['isLogo'] ?? $shop['is_logo'] ?? false),
                    'cta' => $shop['cta'] ?? 'Visit Shop',
                    'is_placeholder' => (bool) ($shop['isPlaceholder'] ?? $shop['is_placeholder'] ?? false),
                    'order' => (int) ($shop['order'] ?? $index),
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                $shops,
                array_keys($shops),
            ));
        });
    }

    public function down(): void
    {
        // Preserve live content; no rollback.
    }

    private function shouldReplaceExistingContent(array $content): bool
    {
        $existingItems = DB::table('shop_items')
            ->where('page_content_id', $content['id'])
            ->orderBy('order')
            ->orderBy('id')
            ->get(['name', 'description', 'cta', 'is_placeholder'])
            ->map(fn (object $item): array => (array) $item)
            ->all();

        return ($content['hero_title'] ?? null) === 'Club Shop'
            && ($content['hero_description'] ?? null) === 'Support Naomh Mairtin CPG & LGFA by purchasing official gear and merchandise through our approved retail partners.'
            && count($existingItems) === 2
            && ($existingItems[0]['name'] ?? null) === 'Club Shop Partner'
            && ($existingItems[1]['name'] ?? null) === 'Future Supplier'
            && (bool) ($existingItems[0]['is_placeholder'] ?? false) === true
            && (bool) ($existingItems[1]['is_placeholder'] ?? false) === true;
    }

    private function resolveFallbackImagePath(array $shop): ?string
    {
        $image = ($shop['image'] ?? '') ?: null;

        if ($image) {
            return $image;
        }

        return match (strtolower(trim((string) ($shop['name'] ?? '')))) {
            "o'neills" => '/shop-assets/oneills-placeholder.svg',
            'clear cut marketing' => '/shop-assets/clear-cut-marketing-placeholder.svg',
            default => null,
        };
    }
};
