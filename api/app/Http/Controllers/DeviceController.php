<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDeviceRequest;
use App\Http\Resources\DeviceResource;
use App\Models\Device;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class DeviceController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return DeviceResource::collection(Device::all());
    }

    public function show(Device $device): DeviceResource
    {
        return DeviceResource::make($device);
    }

    public function store(StoreDeviceRequest $request): DeviceResource
    {
        $device = Device::create($request->validated());
        return DeviceResource::make($device);
    }
}
