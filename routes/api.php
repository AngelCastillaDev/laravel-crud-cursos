<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonController;

Route::get('/persons', [PersonController::class, 'index']);
Route::get('/persons/paginated', [PersonController::class, 'indexpagination']);
Route::get('/persons/{id}', [PersonController::class, 'show']);
Route::post('/persons', [PersonController::class, 'store']);
Route::put('/persons/{id}', [PersonController::class, 'update']);
Route::patch('/persons/{id}', [PersonController::class, 'updatePartial']);
Route::delete('/persons/{id}', [PersonController::class, 'destroy']);
