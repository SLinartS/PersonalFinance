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

        $options = Option::join("currencies", "options.currency_id", "currencies.id")
        ->join("separators", "options.separator_id", "separators.id")
        ->join("spaces", "options.space_id", "spaces.id")
        ->where("options.user_id", $userId)
        ->select("options.user_id", "options.currency_id", "options.separator_id", "options.space_id",
        "currencies.value as currencyValue",
        "separators.value as separatorValue", "spaces.value as spaceValue",)
        ->first();

        return [
            "currencies" => $currencies,
            "separators" => $separators,
            "spaces" => $spaces,
            "options" => $options,
        ];
    }

    public function updateOptionsList(Request $request)
    {
        $data = $request->post();

        Option::where("user_id", $data["userId"])->update([
            "currency_id" => $data["optionCurrencies"],
            "separator_id" => $data["optionSeparators"],
            "space_id" => $data["optionSpaces"],
        ]);
    }
}
