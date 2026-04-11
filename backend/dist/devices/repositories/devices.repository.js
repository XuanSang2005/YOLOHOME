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
exports.DevicesRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const device_schema_1 = require("../schemas/device.schema");
let DevicesRepository = class DevicesRepository {
    constructor(model) {
        this.model = model;
    }
    async onModuleInit() {
        const count = await this.model.countDocuments();
        if (count === 0) {
            await this.model.insertMany([
                { name: 'Living Room Light', type: 'light', room: 'Living Room', status: 'on', ip_address: '192.168.1.10', last_seen_at: '2026-04-08T14:30:00' },
                { name: 'Temperature Sensor', type: 'sensor', room: 'Living Room', status: 'active', ip_address: '192.168.1.11', last_seen_at: '2026-04-08T14:30:00' },
                { name: 'Front Door Webcam', type: 'camera', room: 'Front Door', status: 'active', ip_address: '192.168.1.12', last_seen_at: '2026-04-08T14:30:00' },
                { name: 'Bedroom Light', type: 'light', room: 'Bedroom', status: 'off', ip_address: '192.168.1.13', last_seen_at: '2026-04-08T14:30:00' },
                { name: 'Kitchen Light', type: 'light', room: 'Kitchen', status: 'on', ip_address: '192.168.1.14', last_seen_at: '2026-04-08T14:30:00' },
            ]);
        }
    }
    findAll(type) {
        return type ? this.model.find({ type }) : this.model.find();
    }
    findById(id) {
        return this.model.findById(id);
    }
    create(dto) {
        return this.model.create({
            name: dto.name,
            type: dto.type,
            room: dto.room,
            status: dto.status ?? 'off',
            ip_address: dto.ip_address ?? '',
            last_seen_at: new Date().toISOString(),
        });
    }
};
exports.DevicesRepository = DevicesRepository;
exports.DevicesRepository = DevicesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(device_schema_1.Device.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DevicesRepository);
//# sourceMappingURL=devices.repository.js.map