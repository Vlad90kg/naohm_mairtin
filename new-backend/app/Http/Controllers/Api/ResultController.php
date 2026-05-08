<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ResultResource;
use App\Models\Result;
use Illuminate\Http\JsonResponse;

class ResultController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(ResultResource::collection(Result::with(['fixture.homeTeam', 'fixture.awayTeam'])->get())->resolve());
    }
}
