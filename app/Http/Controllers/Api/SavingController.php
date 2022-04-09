<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Saving;
use Illuminate\Http\Request;

class SavingController extends Controller
{
    public function getSavingsByUserId($userId)
    {
        return Saving::where("user_id", $userId)
            ->select("id", "title", "amount")
            ->get();
    }


    public function getSavingById($id)
    {
        $saving = Saving::where("id", $id)
            ->select("id", "title", "amount")
            ->first();

        $saving["type"] = "saving";

        return $saving;
    }

    public function updateSavingById(Request $request)
    {
        $inputData = $request->post();
        Saving::where("id", $inputData["id"])
            ->update([
                "title" => $inputData["title"],
                "amount" => $inputData["amount"]
            ]);
    }

    public function deleteSavingById($id)
    {
        Saving::where("id", $id)->delete();
    }

    public function clearSavingsByUserId($userId)
    {
        Saving::where("user_id", $userId)->delete();
    }

    public function insertSavingByUserId(Request $request)
    {
        $data = $request->post();
        Saving::insert([
            "title" => $data["title"],
            "amount" => $data["amount"],
            "user_id" => $data["userId"],
        ]);
    }
}
