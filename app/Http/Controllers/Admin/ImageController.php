<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:png,jpg,jpeg,gif,webp|max:5120',
        ]);

        $path = $request->file('image')->store('lesson-images', 'public');
        $url = Storage::disk('public')->url($path);

        return response()->json([
            'url' => $url,
            'markdown' => "![image]({$url})",
        ]);
    }
}
