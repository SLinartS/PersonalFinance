<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AccountController;
use App\Http\Controllers\Api\OptionController;
use App\Http\Controllers\Api\OperationController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ColorController;
use App\Http\Controllers\Api\ValidateController;

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

Route::get("getColorsList", [ColorController::class, "getColorsList"]);
Route::get("getOptionsList/{userId}", [OptionController::class, "getOptionsList"]);
Route::post("updateOptionsList", [OptionController::class, "updateOptionsList"]);
Route::post("validateField", [ValidateController::class, "validateField"]);

Route::get("getCategoriesByType/{id}/{type}", [CategoryController::class, "getCategoriesByType"]);
Route::get("getSumCategoryOperations/{id}/{type}", [CategoryController::class, "getSumCategoryOperations"]);
Route::get("getCategoryById/{id}", [CategoryController::class, "getCategoryById"]);
Route::post("insertCategoryByUserId", [CategoryController::class, "insertCategoryByUserId"]);
Route::post("updateCategoryById", [CategoryController::class, "updateCategoryById"]);
Route::get("deleteCategoryById/{id}", [CategoryController::class, "deleteCategoryById"]);

Route::post("getOperationByUserId", [OperationController::class, "getOperationByUserId"]);
Route::get("getOperationById/{id}", [OperationController::class, "getOperationById"]);
Route::post("updateOperationById", [OperationController::class, "updateOperationById"]);
Route::get("deleteOperationById/{id}", [OperationController::class, "deleteOperationById"]);
Route::post("insertOperationByUserId", [OperationController::class, "insertOperationByUserId"]);

Route::post("loadCurrentBalanceByUserId", [OperationController::class, "loadCurrentBalanceByUserId"]);
Route::get("loadDebtAndBalanceByUserId/{userId}", [AccountController::class, "loadDebtAndBalanceByUserId"]);

Route::post("userCheck", [UserController::class, "userCheck"]);
Route::get("getAllUsers", [UserController::class, "getAllUsers"]);
Route::get("findUserData/{email}", [UserController::class, "findUserData"]);
Route::post("insertUser", [UserController::class, "insertUser"]);

Route::get("getAccountsByUserId/{userId}", [AccountController::class, "getAccountsByUserId"]);
Route::get("getAccountById/{id}", [AccountController::class, "getAccountById"]);
Route::post("updateAccountById", [AccountController::class, "updateAccountById"]);
Route::get("deleteAccountById/{id}", [AccountController::class, "deleteAccountById"]);
Route::post("clearAccountsByUserId", [AccountController::class, "clearAccountsByUserId"]);
Route::post("insertAccountByUserId", [AccountController::class, "insertAccountByUserId"]);

