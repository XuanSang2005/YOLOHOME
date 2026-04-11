import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { CameraService } from '../services/camera.service'
import { CameraCommandDto } from '../dto/camera-command.dto'
import { ResponseMessage } from '../../common/decorators/response-message.decorator'

@Controller('camera')
export class CameraController {
  constructor(private readonly cameraService: CameraService) {}

  @Get('logs')
  getLogs() {
    return this.cameraService.getLogs()
  }

  @Post('commands')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Command sent')
  sendCommand(@Body() dto: CameraCommandDto) {
    return this.cameraService.sendCommand(dto)
  }
}
