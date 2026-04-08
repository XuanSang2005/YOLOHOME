<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeviceCommand extends Model
{
    protected $table = 'device_commands';

    protected $fillable = [
        'device_id',
        'command',
        'executed',
        'executed_at'
    ];

    protected $casts = [
        'executed' => 'boolean',
        'executed_at' => 'datetime'
    ];

    public function device()
    {
        return $this->belongsTo(Device::class, 'device_id');
    }
}
