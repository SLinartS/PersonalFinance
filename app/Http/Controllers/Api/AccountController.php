<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{

    public function getAccountsByUserId($userId)
    {
        return Account::where("user_id", $userId)
            ->select("id", "title", "amount")
            ->get();
    }


    public function getAccountById($id)
    {
        $account = Account::where("id", $id)
        ->select("id", "title", "amount")
        ->first();

        $account["type"] = "account";

        return $account;
    }

    public function updateAccountById(Request $request)
    {
        $inputData = $request->post();
        Account::where("id", $inputData["id"])
        ->update([
            "title" => $inputData["title"],
            "amount" => $inputData["amount"]
        ]);
    }

    public function deleteAccountById($id)
    {
        Account::where("id", $id)->delete();
    }

    public function clearAccountsByUserId($userId)
    {
        Account::where("user_id", $userId)->delete();
    }

    public function insertAccountByUserId(Request $request)
    {
        $data = $request->post();
        Account::insert([
            "title" => $data["title"],
            "amount" => $data["amount"],
            "user_id" => $data["userId"],
        ]);
    }
}
