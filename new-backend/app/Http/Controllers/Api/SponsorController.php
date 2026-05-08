<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SponsorResource;
use App\Models\Sponsor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SponsorController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(SponsorResource::collection(Sponsor::where('is_active', true)->get())->resolve());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validateData($request);
        $sponsor = Sponsor::create($data);

        return response()->json((new SponsorResource($sponsor))->resolve(), 201);
    }

    public function update(Request $request, Sponsor $sponsor): JsonResponse
    {
        $data = $this->validateData($request);
        $sponsor->update($data);

        return response()->json((new SponsorResource($sponsor->fresh()))->resolve());
    }

    public function destroy(Sponsor $sponsor): JsonResponse
    {
        $sponsor->delete();

        return response()->json(null, 204);
    }

    private function validateData(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
            'logo' => ['nullable', 'string', 'max:2048'],
            'tier' => ['required', Rule::in(['gold', 'silver', 'bronze'])],
            'is_active' => ['sometimes', 'boolean'],
        ]);
    }
}
