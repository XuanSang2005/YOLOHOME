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
exports.LightsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lights_service_1 = require("../services/lights.service");
const create_command_dto_1 = require("../dto/create-command.dto");
const room_command_dto_1 = require("../dto/room-command.dto");
const update_room_settings_dto_1 = require("../dto/update-room-settings.dto");
const response_message_decorator_1 = require("../../common/decorators/response-message.decorator");
let LightsController = class LightsController {
    constructor(lightsService) {
        this.lightsService = lightsService;
    }
    getCommands() {
        return this.lightsService.getCommands();
    }
    sendCommand(dto) {
        return this.lightsService.sendCommand(dto);
    }
    getRoomSettings() {
        return this.lightsService.getRoomSettings();
    }
    async sendRoomCommand(room, dto) {
        const result = await this.lightsService.sendRoomCommand(room, dto);
        if (!result)
            throw new common_1.NotFoundException(`Room '${room}' not found`);
        return result;
    }
    async updateRoomSettings(room, dto) {
        const result = await this.lightsService.updateRoomSettings(room, dto);
        if (!result)
            throw new common_1.NotFoundException(`Room '${room}' not found`);
        return result;
    }
};
exports.LightsController = LightsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử lệnh đèn' }),
    (0, common_1.Get)('commands'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LightsController.prototype, "getCommands", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Gửi lệnh bật/tắt đèn' }),
    (0, common_1.Post)('commands'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, response_message_decorator_1.ResponseMessage)('Command sent'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_command_dto_1.CreateCommandDto]),
    __metadata("design:returntype", void 0)
], LightsController.prototype, "sendCommand", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lấy cài đặt tất cả phòng' }),
    (0, common_1.Get)('rooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LightsController.prototype, "getRoomSettings", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Gửi lệnh bật/tắt đèn theo phòng' }),
    (0, swagger_1.ApiParam)({ name: 'room', example: 'bedroom', description: 'Tên phòng: bedroom, kitchen, living-room' }),
    (0, common_1.Post)('rooms/:room/command'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, response_message_decorator_1.ResponseMessage)('Room command sent'),
    __param(0, (0, common_1.Param)('room')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, room_command_dto_1.RoomCommandDto]),
    __metadata("design:returntype", Promise)
], LightsController.prototype, "sendRoomCommand", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật cài đặt đèn theo phòng (độ sáng, màu)' }),
    (0, swagger_1.ApiParam)({ name: 'room', example: 'bedroom', description: 'Tên phòng: bedroom, kitchen, living-room' }),
    (0, common_1.Patch)('rooms/:room/settings'),
    (0, response_message_decorator_1.ResponseMessage)('Settings updated'),
    __param(0, (0, common_1.Param)('room')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_room_settings_dto_1.UpdateRoomSettingsDto]),
    __metadata("design:returntype", Promise)
], LightsController.prototype, "updateRoomSettings", null);
exports.LightsController = LightsController = __decorate([
    (0, swagger_1.ApiTags)('Lights'),
    (0, common_1.Controller)('lights'),
    __metadata("design:paramtypes", [lights_service_1.LightsService])
], LightsController);
//# sourceMappingURL=lights.controller.js.map