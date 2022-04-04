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
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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

        if($actionType === "auth") {
            $validator = Validator::make($request->post(), [
                "email" => 'required|email',
                "password" => 'required|min:6',
            ]);
            $errors = $this->validateEmailPass($validator, $errors);
        } else if($actionType === "reg") {
            $validator = Validator::make($request->post(), [
                "name" => 'required|min:6',
                "email" => 'required|email',
                "password" => 'required|same:repPassword',
                'repPassword' => 'required',
            ]);
            $errors = $this->validateEmailPass($validator, $errors);
            if ($validator->errors()->first("name")) {
                foreach($validator->errors()->get("name") as $error) {
                    array_push($errors["name"], $error);
                }
                
            }
            if ($validator->errors()->first("repPassword")) {
                foreach($validator->errors()->get("repPassword") as $error) {
                    array_push($errors["repPassword"], $error);
                }
            }
        }

        if (empty($errors["email"]) && empty($errors["password"])) {
            $usersData = User::all();
            for ($i = 0; $i < count($usersData); $i++){
                if ($inputData["email"] !== $usersData[$i]["email"]) {
                    array_push($errors["valideDB"], 'Invalid email or password');
                } else {
                    $errors["valideDB"] = [];
                    if ($inputData["password"] !== $usersData[$i]["password"]) {
                        array_push($errors["valideDB"], 'Invalid email or password');
                    } else {
                        $errors["valideDB"] = [];
                    }
                }
            }
        }

        return $errors;
    }

    private function validateEmailPass($validator, $errors) {
        if ($validator->errors()->first("email")) {
            foreach($validator->errors()->get("email") as $error) {
                array_push($errors["email"], $error);
            }
            
        }
        if ($validator->errors()->first("password")) {
            foreach($validator->errors()->get("password") as $error) {
                array_push($errors["password"], $error);
            }
        }
        return $errors;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        User::query()->insert([
            "name" => $request["name"],
            "email" => $request["email"],
            "password" => $request["password"],
            "avatar_url" => "none",
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return User::whereColumn("id", $id)->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
