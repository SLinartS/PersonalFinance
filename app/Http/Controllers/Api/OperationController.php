<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Operation;
use Illuminate\Http\Request;

class OperationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $unsortedOperations = Operation::where("user_id", $id)
            ->select("id", "description", "amount", "time")
            ->addSelect(["type" => Category::select("type")->whereColumn("id", "category_id")->take(1)])
            ->get()->toArray();

        $packagedOperations = [];
        if (count($unsortedOperations) !== 0) {

            usort($unsortedOperations, function ($arr1, $arr2) {
                return $arr1['time'] > $arr2['time'];
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
                }


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

                // for ($k = 0; $k < count($packagedOperations); $k++) {
                //     usort($packagedOperations[$k], function ($arr1, $arr2) {
                //         return $arr1['time'] > $arr2['time'];
                //     });
                // }
            }
        }
        return $packagedOperations;
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
