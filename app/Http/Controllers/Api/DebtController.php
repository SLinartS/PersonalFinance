<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Debt;
use Illuminate\Http\Request;

class DebtController extends Controller
{
    public function getDebtsByUserId($id)
    {
        return Debt::where("user_id", $id)
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
}
