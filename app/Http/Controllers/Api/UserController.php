<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function getAllUsers()
    {
        return User::all();
    }

    public function userCheck(Request $request)
    {
        $inputData = $request->post();
        $actionType = $inputData["actionType"];
        $errors = [
            "name" => [],
            "email" => [],
            "password" => [],
            "repPassword" => [],
            "valideDB" => [],
        ];

        if ($actionType === "auth") {
            $validator = Validator::make($request->post(), [
                "email" => 'required|email',
                "password" => 'required',
            ]);
            $errors = $this->validateEmailPass($validator, $errors);
        } else if ($actionType === "reg") {
            $validator = Validator::make($request->post(), [
                "name" => 'required|min:6',
                "email" => 'required|email',
                "password" => 'required|same:repPassword||min:8',
                'repPassword' => 'required',
            ]);
            $errors = $this->validateEmailPass($validator, $errors);
            if ($validator->errors()->first("name")) {
                foreach ($validator->errors()->get("name") as $error) {
                    array_push($errors["name"], $error);
                }
            }
            if ($validator->errors()->first("repPassword")) {
                foreach ($validator->errors()->get("repPassword") as $error) {
                    array_push($errors["repPassword"], $error);
                }
            }
        }

        if (empty($errors["email"]) && empty($errors["password"])) {
            $usersData = User::all();
            switch ($actionType) {
                case "auth":
                    for ($i = 0; $i < count($usersData); $i++) {
                        if ($inputData["email"] !== $usersData[$i]["email"]) {
                            $errors["valideDB"] = ['Invalid email or password'];
                        } else {
                            $errors["valideDB"] = [];
                            if (!Hash::check($inputData["password"], $usersData[$i]["password"])) {
                                $errors["valideDB"] = ['Invalid email or password'];
                            } else {
                                $errors["valideDB"] = [];
                                break;
                            }
                        }
                    }
                    break;
                case "reg":
                    for ($i = 0; $i < count($usersData); $i++) {
                        if ($inputData["email"] === $usersData[$i]["email"]) {
                            $errors["valideDB"] = ['This mail already exists'];
                            break;
                        } else {
                            $errors["valideDB"] = [];
                        }
                    }
                    break;
            }
        }

        return $errors;
    }

    private function validateEmailPass($validator, $errors)
    {
        if ($validator->errors()->first("email")) {
            foreach ($validator->errors()->get("email") as $error) {
                array_push($errors["email"], $error);
            }
        }
        if ($validator->errors()->first("password")) {
            foreach ($validator->errors()->get("password") as $error) {
                array_push($errors["password"], $error);
            }
        }
        return $errors;
    }

    public function insertUser(Request $request)
    {
        User::query()->insert([
            "name" => $request["name"],
            "email" => $request["email"],
            "password" => Hash::make($request["password"]),
            "avatar_url" => "none",
        ]);
    }
}
