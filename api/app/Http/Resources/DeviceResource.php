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
            'type' => $this->type,
            'name' => $this->name,
            // The JSON settings object
            'settings' => $this->settings,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
