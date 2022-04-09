<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
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
}
