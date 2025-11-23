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

    /**
     * Modify validated data before sending to controller.
     * This is where we convert camelCase to snake_case.
     */
    protected function passedValidation()
    {
        // This allows you to "mutate" the validated data for the controller
        $this->replace([
            'name'             => $this->name,
            'type'             => $this->type,
            'allowed_settings' => $this->allowedSettings,
        ]);
    }

    public function rules(): array
    {
        return [
            // Basic Device Info
            'name' => ['required', 'string', 'min:1', 'max:255'],
            'type' => ['required', 'string', 'in:fan,light'],

            'allowedSettings' => ['required', 'array'],

            // 1. Power
            'allowedSettings.power' => ['required', 'array'],
            'allowedSettings.power.type' => ['required', 'string', 'in:boolean'],

            // 2. Intensity 
            'allowedSettings.intensity' => ['required', 'array'],
            'allowedSettings.intensity.type' => ['required', 'string', 'in:range'],
            'allowedSettings.intensity.min' => ['required', 'numeric', 'min:0'],
            'allowedSettings.intensity.max' => ['required', 'numeric', 'max:100', 'gte:allowedSettings.intensity.min'],

            // 3. Color
            'allowedSettings.color' => ['nullable', 'array'],
            // Rules below only run if 'allowedSettings.color' is present
            'allowedSettings.color.type' => ['required_with:allowedSettings.color', 'string', 'in:colors'],
            'allowedSettings.color.options' => ['required_with:allowedSettings.color', 'array'],
            'allowedSettings.color.options.*' => ['string'], // Validates every item in options array is a string
        ];
    }
}
