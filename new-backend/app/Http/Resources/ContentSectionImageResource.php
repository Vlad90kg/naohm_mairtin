<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class ContentSectionImageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'image_url' => $this->resolveAssetUrl($this->image),
            'caption' => $this->caption,
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
