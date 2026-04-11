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
exports.CreateTemperatureLogDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CreateTemperatureLogDto {
}
exports.CreateTemperatureLogDto = CreateTemperatureLogDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25.5, minimum: -40, maximum: 100, description: 'Nhiệt độ (°C)' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-40),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateTemperatureLogDto.prototype, "temperature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 65, minimum: 0, maximum: 100, description: 'Độ ẩm (%)' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateTemperatureLogDto.prototype, "humidity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 320, minimum: 0, description: 'Cường độ ánh sáng (lux)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateTemperatureLogDto.prototype, "light_intensity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 85, minimum: 0, description: 'Chất lượng không khí (AQI)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateTemperatureLogDto.prototype, "air_quality", void 0);
//# sourceMappingURL=create-temperature-log.dto.js.map