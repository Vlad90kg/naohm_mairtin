<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class EventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $imageUrl = $this->resolveAssetUrl($this->image);

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => Str::slug($this->title),
            'date' => $this->date->format('Y-m-d'),
            'time' => $this->time,
            'location' => $this->location,
            'description' => $this->description,
            'image' => $imageUrl,
            'image_url' => $imageUrl,
            'is_featured' => (bool) $this->is_featured,
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

        return URL::to(Storage::url($path));
    }
}
