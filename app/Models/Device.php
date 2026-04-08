<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $table = 'devices';

    protected $fillable = [
        'name',
        'type',
        'room',
        'status',
        'ip_address',
        'last_seen_at'
    ];

    public function commands()
    {
        return $this->hasMany(DeviceCommand::class, 'device_id');
    }
}
