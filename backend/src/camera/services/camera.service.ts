import { Injectable } from '@nestjs/common'
import { CameraRepository } from '../repositories/camera.repository'
import { DevicesRepository } from '../../devices/repositories/devices.repository'
import type { CameraCommandDto } from '../dto/camera-command.dto'
import type { CameraRecognizeDto } from '../dto/camera-recognize.dto'

@Injectable()
export class CameraService {
  constructor(
    private readonly repository: CameraRepository,
    private readonly devicesRepository: DevicesRepository,
  ) {}

  getLogs() {
    return this.repository.findAll()
  }

  sendCommand(dto: CameraCommandDto) {
    return this.repository.createLog(dto.command)
  }

  async processRecognition(dto: CameraRecognizeDto) {
    // Lưu log nhận diện vào DB
    await this.repository.createFaceLog(dto.face_label, dto.authorized)

    if (dto.authorized === 1) {
      // Mở cổng
      await this.devicesRepository.updateGateStatus('open')
      // Tự động đóng lại sau 5 giây
      setTimeout(() => {
        this.devicesRepository.updateGateStatus('closed').catch(() => {})
      }, 5000)
    }

    return { authorized: dto.authorized, face_label: dto.face_label }
  }
}
