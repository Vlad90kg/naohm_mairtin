<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class CommitteePageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'title' => 'Club Committees',
            'subtitle' => 'Meet the people behind Naomh Mairtin CPG & LGFA',
            'sections' => $this->resource->map(function ($section) {
                return [
                    'title' => $section->title,
                    'members' => $section->members
                        ->where('is_active', true)
                        ->sortBy('order')
                        ->values()
                        ->map(function ($member) {
                            return [
                                'role' => $member->role,
                                'name' => $member->name,
                                'image' => $this->resolveAssetUrl($member->image),
                                'email' => $member->email,
                                'phone' => $member->phone,
                            ];
                        })
                        ->all(),
                ];
            })->all(),
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

        $publicPath = Storage::disk('public')->url($path);

        if (str_starts_with($publicPath, 'http://') || str_starts_with($publicPath, 'https://')) {
            return $publicPath;
        }

        return URL::to($publicPath);
    }
}
