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

Route::get("getCategoriesByType/{id}/{type}", [CategoryController::class, "getCategoriesByType"]);
Route::get("getSumCategoryOperations/{id}/{type}", [CategoryController::class, "getSumCategoryOperations"]);

Route::get("getOperationByUserId/{userId}", [OperationController::class, "getOperationByUserId"]);
Route::get("getOperationById/{id}", [OperationController::class, "getOperationById"]);
Route::post("updateOperationById", [OperationController::class, "updateOperationById"]);
Route::get("deleteOperationById/{id}", [OperationController::class, "deleteOperationById"]);

Route::post("userCheck", [UserController::class, "userCheck"]);
Route::get("getAllUsers", [UserController::class, "getAllUsers"]);
Route::get("findUserData/{email}", [UserController::class, "findUserData"]);
Route::post("insertUser", [UserController::class, "insertUser"]);

Route::get("getAccountsByUserId/{userId}", [AccountController::class, "getAccountsByUserId"]);
Route::get("getAccountById/{id}", [AccountController::class, "getAccountById"]);
Route::post("updateAccountById", [AccountController::class, "updateAccountById"]);
Route::get("deleteAccountById/{id}", [AccountController::class, "deleteAccountById"]);
Route::get("clearAccountsByUserId/{userId}", [AccountController::class, "clearAccountsByUserId"]);
Route::post("insertAccountByUserId", [AccountController::class, "insertAccountByUserId"]);

Route::get("getDebtsByUserId/{userId}", [DebtController::class, "getDebtsByUserId"]);
Route::get("getDebtById/{id}", [DebtController::class, "getDebtById"]);
Route::post("updateDebtById", [DebtController::class, "updateDebtById"]);
Route::get("deleteDebtById/{id}", [DebtController::class, "deleteDebtById"]);
Route::get("clearDebtsByUserId/{userId}", [DebtController::class, "clearDebtsByUserId"]);
Route::post("insertDebtByUserId", [DebtController::class, "insertDebtByUserId"]);

Route::get("getSavingsByUserId/{userId}", [SavingController::class, "getSavingsByUserId"]);
Route::get("getSavingById/{id}", [SavingController::class, "getSavingById"]);
Route::post("updateSavingById", [SavingController::class, "updateSavingById"]);
Route::get("deleteSavingById/{id}", [SavingController::class, "deleteSavingById"]);
Route::get("clearSavingsByUserId/{userId}", [SavingController::class, "clearSavingsByUserId"]);
Route::post("insertSavingByUserId", [SavingController::class, "insertSavingByUserId"]);



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
