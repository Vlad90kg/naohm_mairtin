<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ResultResource;
use App\Models\Fixture;
use App\Models\Result;
use Illuminate\Http\JsonResponse;

class ResultController extends Controller
{
    public function index(): JsonResponse
    {
        $results = Result::query()
            ->with(['fixture.homeTeam', 'fixture.awayTeam'])
            ->whereHas('fixture', fn ($fixtureQuery) => $fixtureQuery->where('date_time', '<', now()))
            ->orderByDesc(
                Fixture::select('date_time')
                    ->whereColumn('fixtures.id', 'results.fixture_id')
                    ->limit(1)
            )
            ->get();

        return response()->json(ResultResource::collection($results)->resolve());
    }
}
