<?php

namespace App\Http\Controllers;

use App\Http\Resources\PackageResource;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;


class PackageController extends Controller
{
    public function search(Request $request)
    {
        try {
            $response = Http::get('https://api.npms.io/v2/search?size=250&q=' . $request['q']);

            $collection = collect($response['results']);

            $repositiries = [];

            foreach ($collection as $item) {
                if (array_key_exists('repository', $item['package']['links'])) {
                    $data = [
                        'name' => $item['package']['name'],
                        'repository' => $item['package']['links']['repository']
                    ];
                    array_push($repositiries, $data);
                }
            }

            return response()->json([
                'success' => true,
                'data' => $repositiries,
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());

            return response()->json([
                'success' => false
            ]);
        }
    }


}
