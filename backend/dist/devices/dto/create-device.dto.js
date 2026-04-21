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
exports.CreateDeviceDto = exports.DeviceRoom = exports.DeviceType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var DeviceType;
(function (DeviceType) {
    DeviceType["LIGHT"] = "light";
    DeviceType["SENSOR"] = "sensor";
    DeviceType["CAMERA"] = "camera";
    DeviceType["GATE"] = "gate";
})(DeviceType || (exports.DeviceType = DeviceType = {}));
var DeviceRoom;
(function (DeviceRoom) {
    DeviceRoom["LIVING_ROOM"] = "Living Room";
    DeviceRoom["BEDROOM"] = "Bedroom";
    DeviceRoom["KITCHEN"] = "Kitchen";
    DeviceRoom["FRONT_DOOR"] = "Front Door";
})(DeviceRoom || (exports.DeviceRoom = DeviceRoom = {}));
class CreateDeviceDto {
}
exports.CreateDeviceDto = CreateDeviceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Living Room Light', minLength: 2, maxLength: 50 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: DeviceType, example: DeviceType.LIGHT }),
    (0, class_validator_1.IsEnum)(DeviceType),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: DeviceRoom, example: DeviceRoom.LIVING_ROOM }),
    (0, class_validator_1.IsEnum)(DeviceRoom),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "room", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '192.168.1.10', description: 'IP address của thiết bị' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(\d{1,3}\.){3}\d{1,3}$/, { message: 'Invalid IP address' }),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "ip_address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['on', 'off'], example: 'on' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['on', 'off']),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "status", void 0);
//# sourceMappingURL=create-device.dto.js.map