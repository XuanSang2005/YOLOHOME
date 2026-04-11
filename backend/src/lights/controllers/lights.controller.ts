import { Controller, Get, Post, Patch, Body, Param, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common'
import { LightsService } from '../services/lights.service'
import { CreateCommandDto } from '../dto/create-command.dto'
import { RoomCommandDto } from '../dto/room-command.dto'
import { UpdateRoomSettingsDto } from '../dto/update-room-settings.dto'
import { ResponseMessage } from '../../common/decorators/response-message.decorator'

@Controller('lights')
export class LightsController {
  constructor(private readonly lightsService: LightsService) {}

  @Get('commands')
  getCommands() {
    return this.lightsService.getCommands()
  }

  @Post('commands')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Command sent')
  sendCommand(@Body() dto: CreateCommandDto) {
    return this.lightsService.sendCommand(dto)
  }

  @Get('rooms')
  getRoomSettings() {
    return this.lightsService.getRoomSettings()
  }

  @Post('rooms/:room/command')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Room command sent')
  async sendRoomCommand(@Param('room') room: string, @Body() dto: RoomCommandDto) {
    const result = await this.lightsService.sendRoomCommand(room, dto)
    if (!result) throw new NotFoundException(`Room '${room}' not found`)
    return result
  }

  @Patch('rooms/:room/settings')
  @ResponseMessage('Settings updated')
  async updateRoomSettings(@Param('room') room: string, @Body() dto: UpdateRoomSettingsDto) {
    const result = await this.lightsService.updateRoomSettings(room, dto)
    if (!result) throw new NotFoundException(`Room '${room}' not found`)
    return result
  }
}
