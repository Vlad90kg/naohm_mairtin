<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FixtureResource;
use App\Models\Fixture;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FixtureController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Fixture::with(['homeTeam', 'awayTeam', 'result']);

        if ($request->has('upcoming')) {
            $query->upcoming();
        }

        if ($request->has('past')) {
            $query->past();
        }

        if (!$request->has('upcoming') && !$request->has('past')) {
            $query->orderBy('date_time', 'asc');
        }

        return response()->json(FixtureResource::collection($query->get())->resolve());
    }
}
