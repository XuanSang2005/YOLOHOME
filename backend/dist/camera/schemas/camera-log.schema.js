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
exports.CameraLogSchema = exports.CameraLog = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let CameraLog = class CameraLog {
};
exports.CameraLog = CameraLog;
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: null }),
    __metadata("design:type", Object)
], CameraLog.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: null }),
    __metadata("design:type", Object)
], CameraLog.prototype, "device_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['camera_on', 'camera_off', 'face_detected'] }),
    __metadata("design:type", String)
], CameraLog.prototype, "event", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CameraLog.prototype, "face_label", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CameraLog.prototype, "note", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: () => new Date().toISOString() }),
    __metadata("design:type", String)
], CameraLog.prototype, "created_at", void 0);
exports.CameraLog = CameraLog = __decorate([
    (0, mongoose_1.Schema)({
        collection: 'camera_logs',
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                delete ret._id;
                return ret;
            },
        },
    })
], CameraLog);
exports.CameraLogSchema = mongoose_1.SchemaFactory.createForClass(CameraLog);
//# sourceMappingURL=camera-log.schema.js.map