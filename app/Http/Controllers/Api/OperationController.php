<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Operation;
use Illuminate\Http\Request;
use PHPUnit\Framework\Constraint\Operator;

class OperationController extends Controller
{

    public function getOperationByUserId(Request $request)
    {
        $data = $request->post();

        if (
            isset($data["searchCrit"]) &&
            isset($data["searchRangeStart"]) &&
            isset($data["searchRangeEnd"])
        ) {
            $unsortedOperations = Operation::join("accounts", "operations.account_id", "accounts.id")
                ->join("categories", "operations.category_id", "categories.id")
                ->select(
                    "operations.id",
                    "operations.description",
                    "categories.type",
                    "operations.amount",
                    "operations.time",
                    "accounts.type as accountType",
                    "accounts.title as accountTitle"
                )
                ->where("operations.user_id", $data["userId"])
                ->where("operations.description", "like", "%" . $data["searchCrit"] . "%")
                ->where("operations.time", ">", $data["searchRangeStart"])
                ->where("operations.time", "<", $data["searchRangeEnd"])
                ->get()->toArray();
        } elseif (
            isset($data["searchCrit"]) &&
            empty($data["searchRangeStart"]) &&
            empty($data["searchRangeEnd"])
        ) {
            $unsortedOperations = Operation::join("accounts", "operations.account_id", "accounts.id")
                ->join("categories", "operations.category_id", "categories.id")
                ->select(
                    "operations.id",
                    "operations.description",
                    "categories.type",
                    "operations.amount",
                    "operations.time",
                    "accounts.type as accountType",
                    "accounts.title as accountTitle"
                )
                ->where("operations.user_id", $data["userId"])
                ->where("operations.description", "like", "%" . $data["searchCrit"] . "%")
                ->get()->toArray();
        } elseif (
            empty($data["searchCrit"]) &&
            isset($data["searchRangeStart"]) &&
            isset($data["searchRangeEnd"])
        ) {
            $unsortedOperations = Operation::join("accounts", "operations.account_id", "accounts.id")
                ->join("categories", "operations.category_id", "categories.id")
                ->select(
                    "operations.id",
                    "operations.description",
                    "categories.type",
                    "operations.amount",
                    "operations.time",
                    "accounts.type as accountType",
                    "accounts.title as accountTitle"
                )
                ->where("operations.user_id", $data["userId"])
                ->where("operations.time", ">", $data["searchRangeStart"])
                ->where("operations.time", "<", $data["searchRangeEnd"])
                ->get()->toArray();
        } elseif (
            empty($data["searchCrit"]) &&
            empty($data["searchRangeStart"]) &&
            empty($data["searchRangeEnd"])
        ) {
            $unsortedOperations = Operation::join("accounts", "operations.account_id", "accounts.id")
                ->join("categories", "operations.category_id", "categories.id")
                ->select(
                    "operations.id",
                    "operations.description",
                    "categories.type",
                    "operations.amount",
                    "operations.time",
                    "accounts.type as accountType",
                    "accounts.title as accountTitle"
                )
                ->where("operations.user_id", $data["userId"])
                ->get()->toArray();
        }

        $packagedOperations = [];
        if (count($unsortedOperations) !== 0) {

            usort($unsortedOperations, function ($arr1, $arr2) {
                return $arr1['time'] < $arr2['time'];
            });

            $currentSubarray = 0;
            $currentDate = [
                date_parse($unsortedOperations[0]["time"])["year"],
                date_parse($unsortedOperations[0]["time"])["month"],
                date_parse($unsortedOperations[0]["time"])["day"],
            ];

            for ($i = 0; $i < count($unsortedOperations); $i++) {
                $dateInQuestions = [
                    date_parse($unsortedOperations[$i]["time"])["year"],
                    date_parse($unsortedOperations[$i]["time"])["month"],
                    date_parse($unsortedOperations[$i]["time"])["day"],
                ];

                $equal = true;
                for ($k = 0; $k < 3; $k++) {
                    if ($dateInQuestions[$k] !== $currentDate[$k]) {
                        $equal = false;
                    }
                };

                if ($equal) {
                    if (count($packagedOperations) === 0) {
                        array_push($packagedOperations, []);
                    };
                    array_push($packagedOperations[$currentSubarray], $unsortedOperations[$i]);
                } else {
                    if (count($packagedOperations) !== 0) {
                        $currentSubarray++;
                    }
                    array_push($packagedOperations, []);
                    array_push($packagedOperations[$currentSubarray], $unsortedOperations[$i]);
                    $currentDate = $dateInQuestions;
                };

                for ($k = 0; $k < count($packagedOperations); $k++) {
                    usort($packagedOperations[$k], function ($arr1, $arr2) {
                        return $arr1['time'] < $arr2['time'];
                    });
                }
            }
        }
        return $packagedOperations;
    }

    public function getOperationById($id)
    {
        $operation = Operation::where("id", $id)
            ->select("id", "description", "amount", "time")
            ->first();

        return $operation;
    }

    public function updateOperationById(Request $request)
    {
        $data = $request->post();

        Operation::where("id", $data["id"])
            ->update([
                "description" => $data["description"],
                "amount" => $data["amount"],
                "time" => $data["time"]
            ]);
    }

    public function deleteOperationById($id)
    {
        Operation::where("id", $id)->delete();
    }

    public function insertOperationByUserId(Request $request)
    {
        $data = $request->post();
        Operation::insert([
            "category_id" => $data["id"],
            "description" => $data["description"],
            "amount" => $data["amount"],
            "time" => $data["time"],
            "account_id" => $data["account_id"],
            "user_id" => $data["userId"],
        ]);
    }

    public function loadCurrentBalanceByUserId(Request $request)
    {
        $data = $request->post();
        $operations = null;
        if (isset($data["rangeStart"]) && isset($data["rangeEnd"])) {
            $operation = Operation::join("categories", "operations.category_id", "categories.id")
                ->select(
                    "operations.id",
                    "operations.description",
                    "operations.amount",
                    "operations.time",
                    "categories.type"
                )
                ->where("operations.time", ">", $data["rangeStart"])
                ->where("operations.time", "<", $data["rangeEnd"])
                ->where("operations.user_id", $data["userId"])
                ->get();
        } else {
            $operation = Operation::join("categories", "operations.category_id", "categories.id")
                ->select(
                    "operations.id",
                    "operations.description",
                    "operations.amount",
                    "operations.time",
                    "categories.type"
                )
                ->where("operations.user_id", $data["userId"])
                ->get();
        }

        $curBalSum = [
            "income" => 0,
            "expenses" => 0,
        ];

        for ($i = 0; $i < count($operation); $i++) {
            if ($operation[$i]["type"] === "income") {
                $curBalSum["income"] = (float)$curBalSum["income"] + (float)$operation[$i]["amount"];
            } else {
                $curBalSum["expenses"] = (float)$curBalSum["expenses"] + (float)$operation[$i]["amount"];
            }
        }

        return $curBalSum;
    }
}
