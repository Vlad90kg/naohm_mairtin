<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TeamResource;
use App\Enums\TeamCategory;
use App\Models\Team;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class TeamController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Team::query();
        $category = null;

        if ($request->filled('category')) {
            $category = $request->string('category')->toString();
            $query->where('category', $category);
        }

        if ($request->filled('senior_group')) {
            $query->where('senior_group', $request->string('senior_group')->toString());
        }

        if ($request->filled('internal')) {
            $query->where('is_internal', filter_var($request->input('internal'), FILTER_VALIDATE_BOOLEAN));
        }

        $teams = $query->get();

        if ($category === TeamCategory::Juvenile->value) {
            $teams = $teams
                ->sort(function (Team $left, Team $right): int {
                    if ($left->sort_order === null && $right->sort_order !== null) {
                        return 1;
                    }

                    if ($left->sort_order !== null && $right->sort_order === null) {
                        return -1;
                    }

                    if ($left->sort_order !== null && $right->sort_order !== null) {
                        $sortOrderCompare = $left->sort_order <=> $right->sort_order;
                        if ($sortOrderCompare !== 0) {
                            return $sortOrderCompare;
                        }
                    }

                    [$leftRank, $leftGenderRank] = $this->getJuvenileFallbackRank($left->name);
                    [$rightRank, $rightGenderRank] = $this->getJuvenileFallbackRank($right->name);

                    $rankCompare = $leftRank <=> $rightRank;
                    if ($rankCompare !== 0) {
                        return $rankCompare;
                    }

                    $genderCompare = $leftGenderRank <=> $rightGenderRank;
                    if ($genderCompare !== 0) {
                        return $genderCompare;
                    }

                    return strcasecmp($left->name, $right->name);
                })
                ->values();
        } else {
            $teams = $teams->sortBy([
                ['category', 'asc'],
                ['name', 'asc'],
            ])->values();
        }

        return response()->json(TeamResource::collection($teams)->resolve());
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
            'sort_order' => ['nullable', 'integer', 'min:0'],
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

    private function getJuvenileFallbackRank(string $name): array
    {
        $normalized = Str::lower($name);
        $genderRank = $this->getGenderRank($normalized);

        if (str_contains($normalized, 'all stars')) {
            return [0, 0];
        }

        if (str_contains($normalized, 'nursery')) {
            return [1, 0];
        }

        if (preg_match('/\bu\s*([0-9]{1,2})\b/i', $name, $matches) === 1) {
            $age = (int) $matches[1];
            if ($age >= 6 && $age <= 17) {
                return [$age, $genderRank];
            }
        }

        if (str_contains($normalized, 'minor')) {
            return [18, $genderRank];
        }

        return [99, 2];
    }

    private function getGenderRank(string $normalizedTeamName): int
    {
        if (
            str_contains($normalizedTeamName, 'boys')
            || str_contains($normalizedTeamName, 'boy')
            || str_contains($normalizedTeamName, 'men')
        ) {
            return 0;
        }

        if (
            str_contains($normalizedTeamName, 'girls')
            || str_contains($normalizedTeamName, 'girl')
            || str_contains($normalizedTeamName, 'ladies')
            || str_contains($normalizedTeamName, 'lady')
        ) {
            return 1;
        }

        return 2;
    }

}
