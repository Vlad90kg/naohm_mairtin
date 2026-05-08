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
            $query->where('date_time', '>=', now());
        }

        if ($request->has('past')) {
            $query->where('date_time', '<', now());
        }

        return response()->json(FixtureResource::collection($query->get())->resolve());
    }
}
