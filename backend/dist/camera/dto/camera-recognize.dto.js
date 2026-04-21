"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraRecognizeDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CameraRecognizeDto {
}
exports.CameraRecognizeDto = CameraRecognizeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [0, 1], example: 1, description: '1 = người được phép, 0 = không nhận ra' }),
    (0, class_validator_1.IsEnum)([0, 1]),
    __metadata("design:type", Number)
], CameraRecognizeDto.prototype, "authorized", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nguyen Van A', description: 'Tên người nhận ra, hoặc "Unknown"' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CameraRecognizeDto.prototype, "face_label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'ID thiết bị camera' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CameraRecognizeDto.prototype, "device_id", void 0);
//# sourceMappingURL=camera-recognize.dto.js.map