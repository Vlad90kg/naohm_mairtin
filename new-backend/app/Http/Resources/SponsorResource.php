<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class SponsorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'website' => $this->website,
            'url' => $this->website,
            'logo' => $this->resolveAssetUrl($this->logo),
            'tier' => $this->tier?->value ?? $this->tier,
            'is_active' => $this->is_active,
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

        if (str_starts_with($path, '/')) {
            return URL::to($path);
        }

        if (Storage::disk('public')->exists($path)) {
            $publicPath = Storage::disk('public')->url($path);
            return str_starts_with($publicPath, 'http://') || str_starts_with($publicPath, 'https://')
                ? $publicPath
                : URL::to($publicPath);
        }

        // Backfill old records that were uploaded to the private/local disk.
        if (Storage::disk('local')->exists($path)) {
            $contents = Storage::disk('local')->get($path);
            Storage::disk('public')->put($path, $contents);

            $publicPath = Storage::disk('public')->url($path);
            return str_starts_with($publicPath, 'http://') || str_starts_with($publicPath, 'https://')
                ? $publicPath
                : URL::to($publicPath);
        }

        $publicPath = Storage::disk('public')->url($path);

        return str_starts_with($publicPath, 'http://') || str_starts_with($publicPath, 'https://')
            ? $publicPath
            : URL::to($publicPath);
    }
}
