<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Option;
use App\Models\Currency;
use App\Models\Separator;
use App\Models\Space;

class OptionController extends Controller
{
    public function getOptionsList($userId)
    {
        $currencies = Currency::select("id", "value")->get();

        $separators = Separator::select("id", "value")->get();

        $spaces = Space::select("id", "value")->get();

        return [
            "currencies" => $currencies,
            "separators" => $separators,
            "spaces" => $spaces,
        ];
    }
}
