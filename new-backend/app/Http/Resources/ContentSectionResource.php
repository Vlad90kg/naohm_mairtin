<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class ContentSectionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'body' => $this->body,
            'layout_type' => $this->layout_type,
            'image_url' => $this->resolveAssetUrl($this->image),
            'image_position' => $this->image_position,
            'gallery_images' => ContentSectionImageResource::collection($this->whenLoaded('galleryImages'))->resolve(),
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
