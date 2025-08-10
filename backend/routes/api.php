<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\API\TodoController;

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


Route::controller(AuthController::class)->prefix('auth')->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
});

// Route::middleware(['auth:sanctum'])->group(function () {
Route::controller(ProfileController::class)->prefix('profile')->group(function () {
    Route::get('/', 'index');
    Route::put('/', 'update');
});

Route::controller(TodoController::class)->prefix('todos')->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'destroy');
    Route::put('/{id}/isdone', 'isDone');
});
// });
