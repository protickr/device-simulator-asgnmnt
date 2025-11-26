<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PresetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            // 'device' => $this->device, // loading eagerly
            'device' => new DeviceResource($this->whenLoaded('device')),
            'deviceId' => $this->device_id,
            'configs' => $this->configs,
            'createdAt' => $this->created_at?->toISOString(),
            'updatedAt' => $this->updated_at?->toISOString(),
        ];
    }
}
