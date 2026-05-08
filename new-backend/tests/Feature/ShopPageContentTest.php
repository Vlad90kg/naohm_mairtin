<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShopPageContentTest extends TestCase
{
    use RefreshDatabase;

    public function test_shop_page_is_returned_from_database_backed_content(): void
    {
        $response = $this->getJson('/api/pages/shop');

        $response->assertOk()
            ->assertJsonPath('hero_title', 'Club Shop')
            ->assertJsonPath('hero_highlight', 'Shop')
            ->assertJsonCount(3, 'shops')
            ->assertJsonPath('shops.0.name', "O'Neills")
            ->assertJsonPath('shops.1.isLogo', true)
            ->assertJsonPath('shops.2.isPlaceholder', true);
    }
}
