<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Operation;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;

class AccountController extends Controller
{

    public function getAccountsByUserId($userId)
    {
        $accounts = Account::where("user_id", $userId)
            ->select("id", "title", "type")
            ->get()->toArray();

        $outputData =
            [
                "account" => [],
                "debt" => [],
                "saving" => [],

            ];

        $operations = Operation::join("categories", "operations.category_id", "categories.id")
            ->select(
                "operations.id",
                "operations.amount",
                "operations.account_id",
                "categories.type"
            )
            ->get()->toArray();

        for ($i = 0; $i < count($accounts); $i++) {
            $accounts[$i]["amount"] = 0;
            for ($k = 0; $k < count($operations); $k++) {
                if ($accounts[$i]["id"] === $operations[$k]["account_id"]) {
                    switch ($operations[$k]["type"]) {
                        case "income":
                            $accounts[$i]["amount"] = (float)$accounts[$i]["amount"] + (float)$operations[$k]["amount"];
                            break;
                        case "expenses":
                            $accounts[$i]["amount"] = (float)$accounts[$i]["amount"] - (float)$operations[$k]["amount"];
                            break;
                    }
                }
            }
            $accounts[$i]["amount"] = (string)$accounts[$i]["amount"];
        }
        for ($i = 0; $i < count($accounts); $i++) {
            switch ($accounts[$i]["type"]) {
                case "account":
                    array_push($outputData["account"], $accounts[$i]);
                    break;
                case "debt":
                    array_push($outputData["debt"], $accounts[$i]);
                    break;
                case "saving":
                    array_push($outputData["saving"], $accounts[$i]);
                    break;
            }
        }
        return $outputData;
    }


    public function getAccountById($id)
    {
        return Account::where("id", $id)
            ->select("id", "title", "type")
            ->first();
    }

    public function updateAccountById(Request $request)
    {
        $inputData = $request->post();
        Account::where("id", $inputData["id"])
            ->update([
                "title" => $inputData["title"],
                "type" => $inputData["type"]
            ]);
    }

    public function deleteAccountById($id)
    {
        Operation::join("accounts", "operations.account_id", "accounts.id")
            ->where("accounts.id", $id)
            ->delete();

        Account::where("id", $id)->delete();
    }

    public function clearAccountsByUserId(Request $request)
    {
        $data = $request->post();

        Operation::join("accounts", "operations.account_id", "accounts.id")
            ->where("accounts.user_id", $data["userId"])
            ->where("accounts.type", $data["type"])
            ->delete();

        Account::where("user_id", $data["userId"])
            ->where("accounts.type", $data["type"])
            ->delete();
    }

    public function insertAccountByUserId(Request $request)
    {
        $data = $request->post();
        Account::insert([
            "title" => $data["title"],
            "type" => $data["type"],
            "user_id" => $data["userId"],
        ]);
    }





    public function loadDebtAndBalanceByUserId($userId)
    {
        $accounts = Account::where("user_id", $userId)
            ->select("id", "title", "type")
            ->get()->toArray();
        $outputData =
            [
                "account" => [],
                "debt" => [],
                "saving" => [],
            ];
        $operations = Operation::join("categories", "operations.category_id", "categories.id")
            ->select(
                "operations.id",
                "operations.amount",
                "operations.account_id",
                "categories.type"
            )
            ->get()->toArray();
        for ($i = 0; $i < count($accounts); $i++) {
            $accounts[$i]["amount"] = 0;
            for ($k = 0; $k < count($operations); $k++) {
                if ($accounts[$i]["id"] === $operations[$k]["account_id"]) {
                    switch ($operations[$k]["type"]) {
                        case "income":
                            $accounts[$i]["amount"] = (float)$accounts[$i]["amount"] + (float)$operations[$k]["amount"];
                            break;
                        case "expenses":
                            $accounts[$i]["amount"] = (float)$accounts[$i]["amount"] - (float)$operations[$k]["amount"];
                            break;
                    }
                }
            }
            $accounts[$i]["amount"] = (string)$accounts[$i]["amount"];
        }
        for ($i = 0; $i < count($accounts); $i++) {
            switch ($accounts[$i]["type"]) {
                case "account":
                    $outputData["account"] = (float)$outputData["account"] + (float)$accounts[$i]["amount"];
                    break;
                case "debt":
                    $outputData["debt"] = (float)$outputData["debt"] + (float)$accounts[$i]["amount"];
                    break;
                case "saving":
                    $outputData["saving"] = (float)$outputData["saving"] + (float)$accounts[$i]["amount"];
                    break;
            }
        }
        if (empty($outputData["account"])) {
            $outputData["account"] = 0;
        }
        if (empty($outputData["debt"])) {
            $outputData["debt"] = 0;
        }
        if (empty($outputData["saving"])) {
            $outputData["saving"] = 0;
        }
        return $outputData;
    }
}
