<?php

use App\Http\Controllers\DeviceController;
use App\Http\Middleware\ForceJsonResponse;
use Illuminate\Support\Facades\Route;

Route::middleware(['api', ForceJsonResponse::class])->group(function (): void {
    Route::get('devices', [DeviceController::class, 'index']);
    Route::post('devices', [DeviceController::class, 'store']);
});
