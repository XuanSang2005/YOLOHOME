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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const temperature_service_1 = require("../services/temperature.service");
const create_temperature_log_dto_1 = require("../dto/create-temperature-log.dto");
const response_message_decorator_1 = require("../../common/decorators/response-message.decorator");
let TemperatureController = class TemperatureController {
    constructor(temperatureService) {
        this.temperatureService = temperatureService;
    }
    getLogs() {
        return this.temperatureService.getLogs();
    }
    getCurrent() {
        return this.temperatureService.getCurrentReading();
    }
    createLog(dto) {
        return this.temperatureService.createLog(dto);
    }
};
exports.TemperatureController = TemperatureController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử đo nhiệt độ / độ ẩm' }),
    (0, common_1.Get)('logs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TemperatureController.prototype, "getLogs", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chỉ số mới nhất từ cảm biến' }),
    (0, common_1.Get)('current'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TemperatureController.prototype, "getCurrent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'ESP32 gửi dữ liệu cảm biến lên backend' }),
    (0, common_1.Post)('logs'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, response_message_decorator_1.ResponseMessage)('Log created'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_temperature_log_dto_1.CreateTemperatureLogDto]),
    __metadata("design:returntype", void 0)
], TemperatureController.prototype, "createLog", null);
exports.TemperatureController = TemperatureController = __decorate([
    (0, swagger_1.ApiTags)('Temperature'),
    (0, common_1.Controller)('temperature'),
    __metadata("design:paramtypes", [temperature_service_1.TemperatureService])
], TemperatureController);
//# sourceMappingURL=temperature.controller.js.map