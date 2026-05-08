<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShopPageContentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'hero_eyebrow' => $this->hero_eyebrow,
            'hero_title' => $this->hero_title,
            'hero_highlight' => $this->hero_highlight,
            'hero_description' => $this->hero_description,
            'info_title' => $this->info_title,
            'info_description' => $this->info_description,
            'info_button_text' => $this->info_button_text,
            'info_button_link' => $this->info_button_link,
            'shops' => ShopItemResource::collection($this->shops),
        ];
    }
}
