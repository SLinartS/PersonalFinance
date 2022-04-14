<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ValidateController extends Controller
{
    public function validateField(Request $request)
    {
        $data = $request->post();

        $errors = [
            "title" => null,
            "description" => null,
            "amount" => null,
            "time" => null,
            "selected" => null,
            "img" => null,
        ];

        $validator = Validator::make($data, [
            "title" => 'required|min:4|max:20',
            "description" => 'required|min:4|max:20',
            "amount" => 'required|numeric|max:999999999999999',
            "time" => 'required|date_format:Y-m-d H:i:s',
            "selected" => 'required',
            "img" => 'required',
        ]);

        if ($validator->errors()->first("title") && $data["title"] !== "notValidateCode") {
            $errors["title"] =  $validator->errors()->first("title");
        }
        if ($validator->errors()->first("description") && $data["description"] !== "notValidateCode") {
            $errors["description"] =  $validator->errors()->first("description");
        }
        if ($validator->errors()->first("amount") && $data["amount"] !== "notValidateCode") {
            $errors["amount"] =  $validator->errors()->first("amount");
        }
        if ($validator->errors()->first("time") && $data["time"] !== "notValidateCode") {
            $errors["time"] =  $validator->errors()->first("time");
        }
        if ($validator->errors()->first("selected") && $data["selected"] !== "notValidateCode") {
            $errors["selected"] =  $validator->errors()->first("selected");
        }
        if ($validator->errors()->first("img") && $data["img"] !== "notValidateCode") {
            $errors["img"] =  $validator->errors()->first("img");
        }


        if (
            isset($errors["title"]) ||
            isset($errors["description"]) ||
            isset($errors["amount"]) ||
            isset($errors["time"]) ||
            isset($errors["selected"]) ||
            isset($errors["img"])
        ) {
            return $errors;
        } else {
            return 0;
        }
    }
}
