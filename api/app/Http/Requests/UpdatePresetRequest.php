<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePresetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
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
            'device_id'         => $this->deviceId ?? null,
            'name'              => $this->name,
            'type'              => $this->type,
            'configs'           => $this->configs,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'deviceId' => ['required', 'exists:devices,id'],
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:50'],
            'configs' => ['required', 'array'],
            'configs.power' => ['required', 'boolean'],
            'configs.intensity' => ['required', 'numeric', 'min:0', 'max:100'],
            'configs.color' => ['nullable', 'string'],
        ];
    }
}
