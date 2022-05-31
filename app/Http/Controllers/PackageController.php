<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PackageController extends Controller
{
    public function search(Request $request): JsonResponse
    {
        $response = Http::get('https://api.npms.io/v2/search', [
            'size' => $request['size'],
            'q' => $request['q'],
            'from' => ($request['page'] * $request['size']) - $request['size']
        ]);

        if ($response->ok()) {
            return response()->json([
                'success' => true,
                'data' => $response->json()
            ]);
        } else {
            return response()->json([
                'success' => false,
                'error' => $response->json()
            ]);
        }
    }
}
