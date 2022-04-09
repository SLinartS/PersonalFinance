<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Debt;
use Illuminate\Http\Request;

class DebtController extends Controller
{
    public function getDebtsByUserId($userId)
    {
        return Debt::where("user_id", $userId)
            ->select("id", "title", "amount")
            ->get();
    }

    public function getDebtById($id)
    {
        $debt = Debt::where("id", $id)
        ->select("id", "title", "amount")
        ->first();

        $debt["type"] = "debt";

        return $debt;
    }

    public function updateDebtById(Request $request)
    {
        $inputData = $request->post();
        Debt::where("id", $inputData["id"])
            ->update([
                "title" => $inputData["title"],
                "amount" => $inputData["amount"]
            ]);
    }

    public function deleteDebtById($id)
    {
        Debt::where("id", $id)->delete();
    }

    public function clearDebtsByUserId($userId)
    {
        Debt::where("user_id", $userId)->delete();
    }

    public function insertDebtByUserId(Request $request)
    {
        $data = $request->post();
        Debt::insert([
            "title" => $data["title"],
            "amount" => $data["amount"],
            "user_id" => $data["userId"],
        ]);
    }
}
