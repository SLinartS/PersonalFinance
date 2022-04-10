<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Color;

class ColorController extends Controller
{
    public function getColorsList()
    {
        return Color::select("id", "title", "value")->get();
    }
}
