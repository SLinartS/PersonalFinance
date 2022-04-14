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


        if (isset($data["searchCrit"])) {
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
                ->where("operations.description", $data["searchCrit"])
                ->get()->toArray();
        } else {
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
}
