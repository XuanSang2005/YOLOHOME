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
exports.CameraRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const camera_log_schema_1 = require("../schemas/camera-log.schema");
let CameraRepository = class CameraRepository {
    constructor(model) {
        this.model = model;
    }
    async onModuleInit() {
        const count = await this.model.countDocuments();
        if (count === 0) {
            await this.model.insertMany([
                { user_id: null, device_id: 3, event: 'camera_on', face_label: null, note: 'Camera turned on', created_at: '2026-04-08T08:00:00' },
                { user_id: 1, device_id: 3, event: 'face_detected', face_label: 'Unknown', note: 'Unknown person', created_at: '2026-04-08T11:30:00' },
                { user_id: null, device_id: 3, event: 'camera_off', face_label: null, note: 'Camera turned off', created_at: '2026-04-08T12:00:00' },
                { user_id: null, device_id: 3, event: 'camera_on', face_label: null, note: 'Camera turned on', created_at: '2026-04-08T14:00:00' },
                { user_id: 1, device_id: 3, event: 'face_detected', face_label: 'Nguyen Van A', note: 'Front door', created_at: '2026-04-08T14:30:00' },
            ]);
        }
    }
    findAll() {
        return this.model.find().sort({ created_at: -1 });
    }
    async createLog(command) {
        return this.model.create({
            user_id: null,
            device_id: 3,
            event: command === 'on' ? 'camera_on' : 'camera_off',
            face_label: null,
            note: command === 'on' ? 'Camera turned on' : 'Camera turned off',
            created_at: new Date().toISOString(),
        });
    }
};
exports.CameraRepository = CameraRepository;
exports.CameraRepository = CameraRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(camera_log_schema_1.CameraLog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CameraRepository);
//# sourceMappingURL=camera.repository.js.map