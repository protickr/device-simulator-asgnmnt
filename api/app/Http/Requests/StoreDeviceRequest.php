<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDeviceRequest extends FormRequest
{
    public function authorize(): bool
    {
        // skipping authorization.
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => ['required', 'string', 'in:fan,light'],
            'name' => ['required', 'string', 'max:255'],

            /**
             * The device configuration object.
             * @var object
             * @example {"brightness": 80, "color": "#FFFFFF", "power": true}
             */
            'settings' => ['required', 'array'],

            // Fields for 'light' only: MUST be present if type is light, and must be an integer.
            'settings.brightness' => ['required_if:type,light', 'integer', 'min:0', 'max:100'],
            'settings.color' => ['required_if:type,light', 'array'],

            // Field for 'fan' only: MUST be present if type is fan, and must be an integer.
            'settings.speed' => ['required_if:type,fan', 'integer', 'min:0', 'max:100'],

            // Field for ALL device types: MUST be present.
            'settings.power' => ['required', 'boolean'],
        ];
    }
}
