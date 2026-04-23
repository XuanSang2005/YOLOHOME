import { Injectable, OnModuleInit } from '@nestjs/common'
import { CameraRepository } from '../repositories/camera.repository'
import { DevicesRepository } from '../../devices/repositories/devices.repository'
import type { CameraCommandDto } from '../dto/camera-command.dto'
import type { CameraRecognizeDto } from '../dto/camera-recognize.dto'
import * as mqtt from 'mqtt' // 1. IMPORT THƯ VIỆN MQTT

@Injectable()
export class CameraService implements OnModuleInit {
  private mqttClient!: mqtt.MqttClient

  constructor(
    private readonly repository: CameraRepository,
    private readonly devicesRepository: DevicesRepository,
  ) {}

  // 2. KẾT NỐI VỚI OHSTEM KHI BACKEND VỪA CHẠY
  onModuleInit() {
    this.mqttClient = mqtt.connect('mqtt://mqtt.ohstem.vn:1883', {
      username: 'YoloHome2907',
      password: '',
    })

    this.mqttClient.on('connect', () => {
      console.log('✅ Backend đã kết nối thành công với OhStem MQTT!')
    })

    this.mqttClient.on('error', (err) => {
      console.error('❌ Lỗi kết nối MQTT:', err)
    })
  }

  getLogs() {
    return this.repository.findAll()
  }

  sendCommand(dto: CameraCommandDto) {
    return this.repository.createLog(dto.command)
  }

  async processRecognition(dto: CameraRecognizeDto) {
    // Lưu log nhận diện vào DB (Code cũ của Quân)
    await this.repository.createFaceLog(dto.face_label, dto.authorized)

    if (dto.authorized === 1) {
      // Lưu trạng thái Mở cổng vào Database
      await this.devicesRepository.updateGateStatus('open')
      
      // 3. BẮN TÍN HIỆU 1 LÊN OHSTEM ĐỂ MẠCH YOLO:BIT MỞ CỬA
      this.mqttClient.publish('YoloHome2907/feeds/V7', '1')
      console.log('🚪 Đã gửi lệnh MỞ CỬA (1) lên kênh V7')

      // Tự động đóng lại sau 5 giây
      setTimeout(() => {
        // Lưu trạng thái Đóng cổng vào Database
        this.devicesRepository.updateGateStatus('closed').catch(() => {})
        
        // 4. BẮN TÍN HIỆU 0 LÊN OHSTEM ĐỂ MẠCH YOLO:BIT ĐÓNG CỬA
        this.mqttClient.publish('YoloHome2907/feeds/V7', '0')
        console.log('🚪 Đã gửi lệnh ĐÓNG CỬA (0) lên kênh V7')
      }, 5000)
    }

    return { authorized: dto.authorized, face_label: dto.face_label }
  }
}