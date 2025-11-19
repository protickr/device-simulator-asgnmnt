<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Preset extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'type',
        'devices',
    ];

    public $incrementing = false;

    protected $keyType = 'string';

    protected $casts = [
        'devices' => 'array',
    ];
}
