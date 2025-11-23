<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeviceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Scramble reads this structure to build the output schema
        return [
            // UUID primary key
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            // The JSON settings object
            'allowedSettings' => $this->allowed_settings,
            'createdAt' => $this->created_at?->toISOString(),
            'updatedAt' => $this->updated_at?->toISOString(),
        ];
    }
}
