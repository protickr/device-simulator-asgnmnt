<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasUuids;
    protected $fillable = ['type', 'name', 'settings'];

    // Define properties for UUID primary key (required by Eloquent)
    public $incrementing = false;
    protected $keyType = 'string';

    // Automatically convert JSON field to PHP array and back
    protected $casts = [
        'settings' => 'array',
    ];
}
