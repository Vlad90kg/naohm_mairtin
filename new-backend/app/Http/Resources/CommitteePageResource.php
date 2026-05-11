<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CommitteePageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'title' => 'Club Committees',
            'subtitle' => 'Meet the people behind Naomh Mairtin CPG',
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

        $publicPath = Storage::disk('public')->url($path);

        return rtrim(request()->getSchemeAndHttpHost(), '/') . '/' . ltrim($publicPath, '/');
    }
}
