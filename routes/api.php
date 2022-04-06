<?php

use App\Http\Controllers\Api\AccountController;
use App\Http\Controllers\Api\BudgetController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ColorController;
use App\Http\Controllers\Api\CurrencyController;
use App\Http\Controllers\Api\DebtController;
use App\Http\Controllers\Api\OperationController;
use App\Http\Controllers\Api\OptionController;
use App\Http\Controllers\Api\SavingController;
use App\Http\Controllers\Api\SeparatorController;
use App\Http\Controllers\Api\SpaceController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get("reqCatsByType/{id}/{type}", [CategoryController::class, "reqCatsByType"]);
Route::get("reqOperationsByCat/{id}/{type}", [CategoryController::class, "reqOperationsByCat"]);

Route::post("userCheck", [UserController::class, "userCheck"]);
Route::get("getAllUsers", [UserController::class, "getAllUsers"]);
Route::post("insertUser", [UserController::class, "insertUser"]);

Route::get("getAccountsByUserId/{id}", [AccountController::class, "getAccountsByUserId"]);
Route::get("getAccountById/{id}", [AccountController::class, "getAccountById"]);
Route::post("updateAccountById", [AccountController::class, "updateAccountById"]);
Route::get("deleteAccountById/{id}", [AccountController::class, "deleteAccountById"]);

Route::get("getDebtsByUserId/{id}", [DebtController::class, "getDebtsByUserId"]);
Route::get("getDebtById/{id}", [DebtController::class, "getDebtById"]);
Route::post("updateDebtById", [DebtController::class, "updateDebtById"]);
Route::get("deleteDebtById/{id}", [DebtController::class, "deleteDebtById"]);

Route::get("getSavingsByUserId/{id}", [SavingController::class, "getSavingsByUserId"]);
Route::get("getSavingById/{id}", [SavingController::class, "getSavingById"]);
Route::post("updateSavingById", [SavingController::class, "updateSavingById"]);
Route::get("deleteSavingById/{id}", [SavingController::class, "deleteSavingById"]);



// Route::apiResources([
//     'option' => OptionController::class,
//     'currency' => CurrencyController::class,
//     'space' => SpaceController::class,
//     'separator' => SeparatorController::class,
//     'operation' => OperationController::class,
//     'budget' => BudgetController::class,
//     'color' => ColorController::class,
// ]);

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
