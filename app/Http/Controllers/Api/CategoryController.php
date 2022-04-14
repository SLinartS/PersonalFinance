<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Operation;
use App\Models\UserCategory;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getCategoriesByType($id, $type)
    {
        return Category::query()
            ->join("colors", "categories.color_id", "colors.id")
            ->join("users_categories", "categories.id", "users_categories.category_id")
            ->join("users", "users_categories.user_id", "users.id")
            ->select(
                "categories.id",
                "categories.type",
                "categories.title",
                "categories.img_url",
                "colors.value as color"
            )
            ->where("categories.type", $type)
            ->where("users.id", $id)
            ->get();
    }

    public function getSumCategoryOperations($id, $type)
    {
        $operationByCat = Category::query()
            ->join("colors", "categories.color_id", "colors.id")
            ->join("users_categories", "categories.id", "users_categories.category_id")
            ->join("users", "users_categories.user_id", "users.id")
            ->join("operations", "operations.category_id", "categories.id")
            ->join("users as users_ap", "operations.user_id", "users.id")
            ->select(
                "categories.id",
                "categories.type",
                "categories.title",
                "categories.img_url",
                "colors.value as color",
                "operations.description",
                "operations.amount as operation_amount",
                "operations.time as operation_time",
                "users.id as user_id"
            )
            ->where("categories.type", $type)
            ->where("users.id", $id)
            ->where("users_ap.id", $id)
            ->get();

        $locSumOper = [];
        $equal = false;
        for ($i = 0; $i < count($operationByCat); $i++) {
            foreach (array_keys($locSumOper) as $key) {
                if ($key === $operationByCat[$i]["title"]) {
                    $equal = true;
                }
            }
            if (!$equal) {
                $locSumOper[$operationByCat[$i]["title"]] = 0;
            }
            $equal = false;
        }
        foreach (array_keys($locSumOper) as $key) {
            for ($i = 0; $i < count($operationByCat); $i++) {
                if ($key === $operationByCat[$i]["title"]) {
                    $locSumOper[$key] += (int) $operationByCat[$i]["operation_amount"];
                }
            }
        }

        return $locSumOper;
    }

    public function getCategoryById($id)
    {

        $category = Category::query()
            ->join("colors", "categories.color_id", "colors.id")
            ->select(
                "categories.id",
                "categories.type",
                "categories.title",
                "categories.img_url",
                "colors.value as color",
                "colors.id as color_id"
            )
            ->where("categories.id", $id)
            ->first();

        $accounts = Category::query()
            ->join("users_categories", "categories.id", "users_categories.category_id")
            ->join("users", "users_categories.user_id", "users.id")
            ->join("accounts", "users.id", "accounts.user_id")
            ->select(
                "accounts.id",
                "accounts.title",
                "accounts.amount",
                "accounts.type",
            )
            ->where("categories.id", $id)
            ->get()->toArray();


        $operations = Operation::join("categories", "operations.category_id", "categories.id")
            ->select(
                "operations.id",
                "operations.amount",
                "operations.account_id",
                "categories.type"
            )
            ->get()->toArray();

        for ($i = 0; $i < count($accounts); $i++) {
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

        $category["accounts"] = $accounts;

        return $category;
    }

    public function insertCategoryByUserId(Request $request)
    {
        $data = $request->post();

        Category::insert([
            "type" => $data["type"],
            "title" => $data["title"],
            "img_url" => $data["img_url"],
            "color_id" => $data["color_id"],
        ]);

        $currentCategory = Category::select("id", "type", "title")->where("title", $data["title"])->first();

        UserCategory::insert([
            "user_id" => $data["userId"],
            "category_id" => $currentCategory["id"]
        ]);
    }

    public function updateCategoryById(Request $request)
    {
        $data = $request->post();

        Category::where("id", $data["id"])->update([
            "title" => $data["title"],
            "img_url" => $data["img_url"],
            "color_id" => $data["color_id"],
        ]);
    }

    public function deleteCategoryById($id)
    {

        $category = Category::where("id", $id)->first()->toArray();

        if ($category["type"] === "income") {
            Operation::query()
                ->join("categories", "operations.category_id", "categories.id")
                ->where("categories.id", $id)->update([
                    "category_id" => 1
                ]);
        } elseif ($category["type"] === "expenses") {
            Operation::query()
                ->join("categories", "operations.category_id", "categories.id")
                ->where("categories.id", $id)->update([
                    "category_id" => 2
                ]);
        }

        UserCategory::where("category_id", $id)->delete();
        Category::where("id", $id)->delete();
    }
}
