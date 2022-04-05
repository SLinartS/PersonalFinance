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

Route::get("reqCatTypes/{id}/{type}", [CategoryController::class, "reqCatTypes"]);
Route::get("reqCatOperations/{id}/{type}", [CategoryController::class, "reqCatOperations"]);

Route::post("userCheck", [UserController::class, "userCheck"]);

Route::apiResources([
    'users' => UserController::class,
    'account' => AccountController::class,
    'debt' => DebtController::class,
    'saving' => SavingController::class,
    'option' => OptionController::class,
    'currency' => CurrencyController::class,
    'space' => SpaceController::class,
    'separator' => SeparatorController::class,
    'operation' => OperationController::class,
    'budget' => BudgetController::class,
    'category' => CategoryController::class,
    'color' => ColorController::class,
]);

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
