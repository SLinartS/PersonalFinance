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
        ];

        $validator = Validator::make($data, [
            "title" => 'required|min:4|max:20',
            "description" => 'required|min:4|max:20',
            "amount" => 'required|numeric|max:15',
            "time" => 'required|date_format:Y-m-d H:i:s',
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

        if (
            isset($errors["title"]) ||
            isset($errors["description"]) ||
            isset($errors["amount"]) ||
            isset($errors["time"])
        ) {
            return $errors;
        } else {
            return 0;
        }
    }
}
