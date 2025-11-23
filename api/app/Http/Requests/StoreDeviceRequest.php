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
    protected function prepareForValidation()
    {
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

            'allowed_settings' => ['required', 'array'],

            // 1. Power
            'allowed_settings.power' => ['required', 'array'],
            'allowed_settings.power.type' => ['required', 'string', 'in:boolean'],

            // 2. Intensity 
            'allowed_settings.intensity' => ['required', 'array'],
            'allowed_settings.intensity.type' => ['required', 'string', 'in:range'],
            'allowed_settings.intensity.min' => ['required', 'numeric', 'min:0'],
            'allowed_settings.intensity.max' => ['required', 'numeric', 'max:100', 'gte:allowed_settings.intensity.min'],

            // 3. Color
            'allowed_settings.color' => ['nullable', 'array'],
            // Rules below only run if 'allowed_settings.color' is present
            'allowed_settings.color.type' => ['required_with:allowed_settings.color', 'string', 'in:colors'],
            'allowed_settings.color.options' => ['required_with:allowed_settings.color', 'array'],
            'allowed_settings.color.options.*' => ['string'], // Validates every item in options array is a string
        ];
    }
}
