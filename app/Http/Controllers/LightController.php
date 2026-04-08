<?php

namespace App\Http\Controllers;

use App\Models\Device;
use App\Models\DeviceCommand;

class LightController extends Controller
{
    public function index()
    {
        $light = Device::where('type', 'light')->first();
        $commands = DeviceCommand::with('device')->latest()->take(10)->get();

        return view('lights', compact('light', 'commands'));
    }

    public function turnOn()
    {
        $light = Device::where('type', 'light')->first();

        if (!$light) {
            return redirect('/lights')->with('error', 'Không tìm thấy thiết bị đèn');
        }

        DeviceCommand::create([
            'device_id' => $light->id,
            'command' => 'on',
            'executed' => 0
        ]);

        $light->update([
            'status' => 'on'
        ]);

        return redirect('/lights')->with('success', 'Đã gửi lệnh bật đèn');
    }

    public function turnOff()
    {
        $light = Device::where('type', 'light')->first();

        if (!$light) {
            return redirect('/lights')->with('error', 'Không tìm thấy thiết bị đèn');
        }

        DeviceCommand::create([
            'device_id' => $light->id,
            'command' => 'off',
            'executed' => 0
        ]);

        $light->update([
            'status' => 'off'
        ]);

        return redirect('/lights')->with('success', 'Đã gửi lệnh tắt đèn');
    }
}
