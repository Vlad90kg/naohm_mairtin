<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class TeamResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'category' => $this->category?->value ?? $this->category,
            'category_display' => $this->category?->getLabel() ?? $this->category,
            'senior_group' => $this->senior_group,
            'image' => $this->resolveAssetUrl($this->image),
            'description' => $this->description,
            'managers' => collect($this->managers ?? [])->map(function ($manager) {
                if (is_string($manager)) {
                    return [
                        'role' => '',
                        'name' => $manager,
                        'phone' => null,
                        'email' => null,
                    ];
                }

                return [
                    'role' => $manager['role'] ?? '',
                    'name' => $manager['name'] ?? '',
                    'phone' => $manager['phone'] ?? null,
                    'email' => $manager['email'] ?? null,
                ];
            })->values(),
            'training_times' => collect($this->training_times ?? [])->values(),
            'contact_email' => $this->contact_email,
            'is_internal' => $this->is_internal,
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

        $publicPath = Storage::url($path);

        if (str_starts_with($publicPath, 'http://') || str_starts_with($publicPath, 'https://')) {
            return $publicPath;
        }

        return URL::to($publicPath);
    }
}
