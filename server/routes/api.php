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
Route::post('/offline', [Controller::class, 'setOffline']);
Route::post('/update-user-image', [Controller::class, 'updateUserPhoto']);

Route::get('/all-users', [Controller::class, 'getAllUsers']);
Route::get('/all-users/{id}', [Controller::class, 'getAllUsers']);
Route::get('/update-online/{id}', [Controller::class, 'updateOnline']);
