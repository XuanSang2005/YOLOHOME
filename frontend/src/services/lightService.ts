import type { Device, DeviceCommand } from '../types'
import { devices, deviceCommands } from './mockData'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function getLight(): Promise<Device> {
  await delay(200)
  return devices.find(d => d.type === 'light')!
}

export async function getLightCommands(): Promise<DeviceCommand[]> {
  await delay(200)
  return deviceCommands
}

export async function sendLightCommand(command: 'on' | 'off'): Promise<DeviceCommand> {
  await delay(300)
  const light = devices.find(d => d.type === 'light')!
  light.status = command
  const newCommand: DeviceCommand = {
    id: deviceCommands.length + 1,
    device_id: light.id,
    command,
    executed: false,
    executed_at: null,
    created_at: new Date().toISOString(),
    device: light,
  }
  deviceCommands.unshift(newCommand)
  return newCommand
}
