<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RolController;
use App\Http\Controllers\TareasController;

Route::apiResource('roles', RolController::class);



//tareas
Route::get('/tareas', [TareasController::class, 'index']);

Route::post('/tareas', [TareasController::class, 'store']);

Route::get('/tareas/{tarea}', [TareasController::class, 'show']);

Route::put('/tareas/{tarea}', [TareasController::class, 'update']);

Route::delete('/tareas/{tarea}', [TareasController::class, 'destroy']);