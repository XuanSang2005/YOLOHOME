<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LightController;
use App\Http\Controllers\TemperatureController;
use App\Http\Controllers\CameraController;

Route::get('/', function () {
    return view('dashboard');
});

Route::get('/lights', [LightController::class, 'index']);
Route::post('/lights/on', [LightController::class, 'turnOn']);
Route::post('/lights/off', [LightController::class, 'turnOff']);

Route::get('/temperature', [TemperatureController::class, 'index']);
Route::get('/camera', [CameraController::class, 'index']);
