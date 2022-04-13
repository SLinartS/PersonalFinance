<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function getAllUsers()
    {
        return User::all();
    }

    public function findUserData($email)
    {
        return User::select("id", "email", "name")->where("email", $email)->first();
    }

    public function userCheck(Request $request)
    {
        $inputData = $request->post();
        $isReg = $inputData["isReg"];
        $errors = [
            "name" => null,
            "email" => null,
            "password" => null,
            "repPassword" => null,
            "valideDB" => null,
        ];

        if ($isReg) {

            $errors["name"] = null;
            $errors["repPassword"] = null;

            $validator = Validator::make($request->post(), [
                "name" => 'required|min:6',
                "email" => 'required|email',
                "password" => 'required|min:8',
                'repPassword' => 'required|same:password',
            ]);
            $errors = $this->validateEmailPass($validator, $errors);
            if ($validator->errors()->first("name")) {
                $errors["name"] =  $validator->errors()->first("name");
            }
            if ($validator->errors()->first("repPassword")) {
                $errors["repPassword"] = $validator->errors()->first("repPassword");
            }
        } else {
            $validator = Validator::make($request->post(), [
                "email" => 'required|email',
                "password" => 'required',
            ]);
            $errors = $this->validateEmailPass($validator, $errors);
        }

        if (empty($errors["email"]) && empty($errors["password"])) {
            $usersData = User::all();
            if ($isReg) {
                for ($i = 0; $i < count($usersData); $i++) {
                    if ($inputData["email"] === $usersData[$i]["email"]) {
                        $errors["valideDB"] = 'Такая почта уже существует';
                        break;
                    } else {
                        $errors["valideDB"] = null;
                    }
                }
            } else {
                for ($i = 0; $i < count($usersData); $i++) {
                    if ($inputData["email"] !== $usersData[$i]["email"]) {
                        $errors["valideDB"] = 'Неверная почта или пароль';
                    } else {
                        $errors["valideDB"] = [];
                        if (!Hash::check($inputData["password"], $usersData[$i]["password"])) {
                            $errors["valideDB"] = 'Неверная почта или пароль';
                        } else {
                            $errors["valideDB"] = null;
                            break;
                        }
                    }
                }
            }
        }

        if (
            isset($errors["name"]) ||
            isset($errors["email"]) ||
            isset($errors["password"]) ||
            isset($errors["repPassword"])
        ) {
            return [
                "errors" => $errors,
                "status" => 0,
            ];
        } elseif (isset($errors["valideDB"])) {
            return [
                "errors" => $errors,
                "status" => 1,
            ];
        } else {
            return [
                "errors" => $errors,
                "status" => 2,
            ];
        }
    }

    private function validateEmailPass($validator, $errors)
    {
        if ($validator->errors()->first("email")) {
            $errors["email"] = $validator->errors()->first("email");
        }
        if ($validator->errors()->first("password")) {
            $errors["password"] = $validator->errors()->first("password");
        }
        return $errors;
    }

    public function insertUser(Request $request)
    {
        User::insert([
            "name" => $request["name"],
            "email" => $request["email"],
            "password" => Hash::make($request["password"]),
            "avatar_url" => "none",
        ]);
    }
}
