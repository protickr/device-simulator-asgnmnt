<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasUuids;
    protected $fillable = ['name', 'type', 'allowed_settings'];

    // Define properties for UUID primary key (required by Eloquent)
    public $incrementing = false;
    protected $keyType = 'string';

    // Automatically convert JSON field to PHP array and back
    protected $casts = [
        'allowed_settings' => 'array',
    ];

    // protected function casts(): array
    // {
    //     return [
    //         'type' => DeviceType::class,
    //         'allowed_settings' => 'array',
    //     ];
    // }

    public function presets()
    {
        return $this->hasMany(Preset::class);
    }
}
