<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function storeSponsorLogo(Request $request): JsonResponse
    {
        $data = $request->validate([
            'file' => ['required', 'file', 'image', 'max:5120'],
        ]);

        $path = $request->file('file')->store('sponsors', 'public');

        return response()->json([
            'logo' => $path,
        ]);
    }
}
