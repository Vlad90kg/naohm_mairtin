<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

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
            'hero_image_url' => $this->resolveAssetUrl($this->hero_image),
            'sections' => ContentSectionResource::collection($sections)->resolve(),
        ];
    }

    private function resolveAssetUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, 'blob:') || str_starts_with($path, 'data:')) {
            return $path;
        }

        $publicPath = Storage::disk('public')->url($path);

        return rtrim(request()->getSchemeAndHttpHost(), '/') . '/' . ltrim($publicPath, '/');
    }
}
