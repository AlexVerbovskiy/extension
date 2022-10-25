<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;

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


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/save', [Controller::class, 'save']);
Route::get('/all-images', [Controller::class, 'getAllImages']);
Route::post('/deactivate', [Controller::class, 'deactivate']);
Route::get('/count-users', [Controller::class, 'getCountUsers']);

//Route::get('/all-images/{id}', [Controller::class, 'getAllImages']);