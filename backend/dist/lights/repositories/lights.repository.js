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
exports.LightsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const light_command_schema_1 = require("../schemas/light-command.schema");
const room_setting_schema_1 = require("../schemas/room-setting.schema");
let LightsRepository = class LightsRepository {
    constructor(commandModel, roomModel) {
        this.commandModel = commandModel;
        this.roomModel = roomModel;
    }
    async onModuleInit() {
        const [cmdCount, roomCount] = await Promise.all([
            this.commandModel.countDocuments(),
            this.roomModel.countDocuments(),
        ]);
        if (cmdCount === 0) {
            await this.commandModel.insertMany([
                { device_id: 1, device_name: 'Living Room', command: 'on', executed: true, executed_at: '2026-04-08T10:00:00', created_at: '2026-04-08T10:00:00' },
                { device_id: 1, device_name: 'Living Room', command: 'off', executed: true, executed_at: '2026-04-08T10:30:00', created_at: '2026-04-08T10:30:00' },
                { device_id: 1, device_name: 'Living Room', command: 'on', executed: true, executed_at: '2026-04-08T10:50:00', created_at: '2026-04-08T10:50:00' },
                { device_id: 1, device_name: 'Living Room', command: 'off', executed: true, executed_at: '2026-04-08T11:00:00', created_at: '2026-04-08T11:00:00' },
                { device_id: 1, device_name: 'Living Room', command: 'on', executed: true, executed_at: '2026-04-08T11:10:00', created_at: '2026-04-08T11:10:00' },
                { device_id: 1, device_name: 'Living Room', command: 'off', executed: true, executed_at: '2026-04-08T11:20:00', created_at: '2026-04-08T11:20:00' },
                { device_id: 1, device_name: 'Living Room', command: 'on', executed: true, executed_at: '2026-04-08T11:30:00', created_at: '2026-04-08T11:30:00' },
                { device_id: 1, device_name: 'Living Room', command: 'off', executed: true, executed_at: '2026-04-08T11:40:00', created_at: '2026-04-08T11:40:00' },
                { device_id: 1, device_name: 'Living Room', command: 'on', executed: true, executed_at: '2026-04-08T11:52:00', created_at: '2026-04-08T11:52:00' },
                { device_id: 1, device_name: 'Living Room', command: 'off', executed: true, executed_at: '2026-04-08T12:00:00', created_at: '2026-04-08T12:00:00' },
            ]);
        }
        if (roomCount === 0) {
            await this.roomModel.insertMany([
                { room: 'Bedroom', device_id: 4, is_on: false, brightness: 70, color_temp: 'warm' },
                { room: 'Living Room', device_id: 1, is_on: true, brightness: 85, color_temp: 'neutral' },
                { room: 'Kitchen', device_id: 5, is_on: true, brightness: 100, color_temp: 'cool' },
            ]);
        }
    }
    findAll() {
        return this.commandModel.find().sort({ created_at: -1 });
    }
    getRoomSettings() {
        return this.roomModel.find();
    }
    async updateRoomSettings(room, dto) {
        const update = {};
        if (dto.brightness !== undefined)
            update.brightness = dto.brightness;
        if (dto.color_temp !== undefined)
            update.color_temp = dto.color_temp;
        return this.roomModel.findOneAndUpdate({ room }, { $set: update }, { new: true });
    }
    async sendRoomCommand(room, command) {
        const setting = await this.roomModel.findOneAndUpdate({ room }, { $set: { is_on: command === 'on' } }, { new: true });
        if (!setting)
            return null;
        return this.commandModel.create({
            device_id: setting.device_id,
            device_name: room,
            command,
            executed: false,
            executed_at: null,
            created_at: new Date().toISOString(),
        });
    }
    create(command) {
        return this.sendRoomCommand('Living Room', command);
    }
};
exports.LightsRepository = LightsRepository;
exports.LightsRepository = LightsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(light_command_schema_1.LightCommand.name)),
    __param(1, (0, mongoose_1.InjectModel)(room_setting_schema_1.RoomSetting.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], LightsRepository);
//# sourceMappingURL=lights.repository.js.map