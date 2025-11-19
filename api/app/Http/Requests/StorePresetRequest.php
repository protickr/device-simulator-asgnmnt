<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePresetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:50'],
            'device' => ['required', 'array'],
            'device.power' => ['required', 'boolean'],
            'device.speed' => ['nullable', 'integer', 'min:0', 'max:100'],
            'device.brightness' => ['nullable', 'integer', 'min:0', 'max:100'],
            'device.color' => ['nullable', 'string', 'max:255'],
        ];
    }
}
