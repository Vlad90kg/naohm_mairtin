<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContentPageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $sections = $this->whenLoaded('sections', function () {
            return $this->sections
                ->where('is_active', true)
                ->sortBy('order')
                ->values();
        });

        return [
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'intro_text' => $this->intro_text,
            'sections' => ContentSectionResource::collection($sections)->resolve(),
        ];
    }
}
