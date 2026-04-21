import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { CameraService } from '../services/camera.service'
import { CameraCommandDto } from '../dto/camera-command.dto'
import { CameraRecognizeDto } from '../dto/camera-recognize.dto'
import { ResponseMessage } from '../../common/decorators/response-message.decorator'

@ApiTags('Camera')
@Controller('camera')
export class CameraController {
  constructor(private readonly cameraService: CameraService) {}

  @ApiOperation({ summary: 'Lấy lịch sử hoạt động camera' })
  @Get('logs')
  getLogs() {
    return this.cameraService.getLogs()
  }

  @ApiOperation({ summary: 'Gửi lệnh bật/tắt camera' })
  @Post('commands')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Command sent')
  sendCommand(@Body() dto: CameraCommandDto) {
    return this.cameraService.sendCommand(dto)
  }

  @ApiOperation({ summary: 'Nhận kết quả nhận diện khuôn mặt từ Python script' })
  @Post('recognize')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Recognition processed')
  processRecognition(@Body() dto: CameraRecognizeDto) {
    return this.cameraService.processRecognition(dto)
  }
}
