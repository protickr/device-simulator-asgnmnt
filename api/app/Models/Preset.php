<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Preset extends Model
{
    use HasUuids;

    protected $fillable = [
        'device_id',
        'name',
        'type',
        'configs',
    ];

    public $incrementing = false;

    protected $keyType = 'string';

    protected $casts = [
        'configs' => 'array',
    ];

    public function device()
    {
        return $this->belongsTo(Device::class);
    }
}
