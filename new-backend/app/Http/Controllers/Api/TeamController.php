<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TeamResource;
use App\Enums\TeamCategory;
use App\Models\Team;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TeamController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Team::query();

        if ($request->filled('category')) {
            $query->where('category', $request->string('category')->toString());
        }

        if ($request->filled('senior_group')) {
            $query->where('senior_group', $request->string('senior_group')->toString());
        }

        if ($request->filled('internal')) {
            $query->where('is_internal', filter_var($request->input('internal'), FILTER_VALIDATE_BOOLEAN));
        }

        return response()->json(TeamResource::collection($query->get())->resolve());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validateData($request);
        $team = Team::create($data);

        return response()->json((new TeamResource($team))->resolve(), 201);
    }

    public function show(string $slug): JsonResponse
    {
        return response()->json((new TeamResource(Team::where('slug', $slug)->firstOrFail()))->resolve());
    }

    public function update(Request $request, Team $team): JsonResponse
    {
        $data = $this->validateData($request, $team->id);
        $team->update($data);

        return response()->json((new TeamResource($team->fresh()))->resolve());
    }

    public function destroy(Team $team): JsonResponse
    {
        $team->delete();

        return response()->json(null, 204);
    }

    private function validateData(Request $request, ?int $ignoreId = null): array
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('teams', 'slug')->ignore($ignoreId)],
            'category' => ['required', Rule::in(array_map(fn (TeamCategory $category) => $category->value, TeamCategory::cases()))],
            'senior_group' => ['nullable', Rule::in(['senior_men', 'senior_ladies', 'social'])],
            'image' => ['nullable', 'string', 'max:2048'],
            'description' => ['nullable', 'string', 'max:5000'],
            'managers' => ['nullable', 'array'],
            'managers.*.name' => ['required_with:managers', 'string', 'max:255'],
            'managers.*.role' => ['nullable', 'string', 'max:255'],
            'managers.*.phone' => ['nullable', 'string', 'max:50'],
            'managers.*.email' => ['nullable', 'email', 'max:255'],
            'training_times' => ['nullable', 'array'],
            'training_times.*' => ['nullable', 'string', 'max:255'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'is_internal' => ['sometimes', 'boolean'],
        ]);

        // Backward compatibility: legacy ladies category now maps to adult + senior_ladies.
        if (($request->input('category') ?? null) === 'ladies') {
            $data['category'] = TeamCategory::Adult->value;
            $data['senior_group'] = 'senior_ladies';
        }

        return $data;
    }
}
