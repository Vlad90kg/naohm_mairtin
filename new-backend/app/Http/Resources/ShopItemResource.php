<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class ShopItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'detail' => $this->detail,
            'url' => $this->url,
            'image' => $this->resolveAssetUrl($this->image),
            'isLogo' => $this->is_logo,
            'cta' => $this->cta,
            'isPlaceholder' => $this->is_placeholder,
            'order' => $this->order,
        ];
    }

    private function resolveAssetUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, '/')) {
            return URL::to($path);
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, 'blob:') || str_starts_with($path, 'data:')) {
            return $path;
        }

        return URL::to(Storage::url($path));
    }
}
