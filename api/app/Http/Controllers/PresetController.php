<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePresetRequest;
use App\Http\Requests\UpdatePresetRequest;
use App\Http\Resources\PresetResource;
use App\Models\Preset;
use Illuminate\Http\Response;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PresetController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $presets = Preset::latest()->paginate(15);

        return PresetResource::collection($presets);
    }

    public function store(StorePresetRequest $request): PresetResource
    {
        $data = $request->validated();

        $preset = Preset::create([
            'name' => $data['name'],
            'type' => $data['type'],
            'devices' => $data['device'],
        ]);

        return PresetResource::make($preset);
    }

    public function show(Preset $preset): PresetResource
    {
        return PresetResource::make($preset);
    }

    public function update(UpdatePresetRequest $request, Preset $preset): PresetResource
    {
        $data = $request->validated();

        if (array_key_exists('device', $data)) {
            $data['devices'] = $data['device'];
            unset($data['device']);
        }

        $preset->update($data);

        return PresetResource::make($preset);
    }

    public function destroy(Preset $preset): Response
    {
        $preset->delete();

        return response()->noContent();
    }
}
