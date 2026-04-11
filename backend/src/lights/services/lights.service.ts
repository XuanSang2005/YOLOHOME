import { Injectable } from '@nestjs/common'
import { LightsRepository } from '../repositories/lights.repository'
import type { CreateCommandDto } from '../dto/create-command.dto'
import type { RoomCommandDto } from '../dto/room-command.dto'
import type { UpdateRoomSettingsDto } from '../dto/update-room-settings.dto'

@Injectable()
export class LightsService {
  constructor(private readonly repository: LightsRepository) {}

  getCommands() {
    return this.repository.findAll()
  }

  sendCommand(dto: CreateCommandDto) {
    return this.repository.create(dto.command)
  }

  getRoomSettings() {
    return this.repository.getRoomSettings()
  }

  sendRoomCommand(room: string, dto: RoomCommandDto) {
    return this.repository.sendRoomCommand(room, dto.command)
  }

  updateRoomSettings(room: string, dto: UpdateRoomSettingsDto) {
    return this.repository.updateRoomSettings(room, dto)
  }
}
