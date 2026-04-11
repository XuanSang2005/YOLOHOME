import { Controller, Get, Post, Patch, Body, Param, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger'
import { LightsService } from '../services/lights.service'
import { CreateCommandDto } from '../dto/create-command.dto'
import { RoomCommandDto } from '../dto/room-command.dto'
import { UpdateRoomSettingsDto } from '../dto/update-room-settings.dto'
import { ResponseMessage } from '../../common/decorators/response-message.decorator'

@ApiTags('Lights')
@Controller('lights')
export class LightsController {
  constructor(private readonly lightsService: LightsService) {}

  @ApiOperation({ summary: 'Lấy lịch sử lệnh đèn' })
  @Get('commands')
  getCommands() {
    return this.lightsService.getCommands()
  }

  @ApiOperation({ summary: 'Gửi lệnh bật/tắt đèn' })
  @Post('commands')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Command sent')
  sendCommand(@Body() dto: CreateCommandDto) {
    return this.lightsService.sendCommand(dto)
  }

  @ApiOperation({ summary: 'Lấy cài đặt tất cả phòng' })
  @Get('rooms')
  getRoomSettings() {
    return this.lightsService.getRoomSettings()
  }

  @ApiOperation({ summary: 'Gửi lệnh bật/tắt đèn theo phòng' })
  @ApiParam({ name: 'room', example: 'bedroom', description: 'Tên phòng: bedroom, kitchen, living-room' })
  @Post('rooms/:room/command')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Room command sent')
  async sendRoomCommand(@Param('room') room: string, @Body() dto: RoomCommandDto) {
    const result = await this.lightsService.sendRoomCommand(room, dto)
    if (!result) throw new NotFoundException(`Room '${room}' not found`)
    return result
  }

  @ApiOperation({ summary: 'Cập nhật cài đặt đèn theo phòng (độ sáng, màu)' })
  @ApiParam({ name: 'room', example: 'bedroom', description: 'Tên phòng: bedroom, kitchen, living-room' })
  @Patch('rooms/:room/settings')
  @ResponseMessage('Settings updated')
  async updateRoomSettings(@Param('room') room: string, @Body() dto: UpdateRoomSettingsDto) {
    const result = await this.lightsService.updateRoomSettings(room, dto)
    if (!result) throw new NotFoundException(`Room '${room}' not found`)
    return result
  }
}
