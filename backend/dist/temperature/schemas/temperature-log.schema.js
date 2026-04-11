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
exports.TemperatureLogSchema = exports.TemperatureLog = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let TemperatureLog = class TemperatureLog {
};
exports.TemperatureLog = TemperatureLog;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], TemperatureLog.prototype, "device_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], TemperatureLog.prototype, "temperature", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], TemperatureLog.prototype, "humidity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: null }),
    __metadata("design:type", Object)
], TemperatureLog.prototype, "light_intensity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: null }),
    __metadata("design:type", Object)
], TemperatureLog.prototype, "air_quality", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: () => new Date().toISOString() }),
    __metadata("design:type", String)
], TemperatureLog.prototype, "created_at", void 0);
exports.TemperatureLog = TemperatureLog = __decorate([
    (0, mongoose_1.Schema)({
        collection: 'temperature_logs',
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                delete ret._id;
                return ret;
            },
        },
    })
], TemperatureLog);
exports.TemperatureLogSchema = mongoose_1.SchemaFactory.createForClass(TemperatureLog);
//# sourceMappingURL=temperature-log.schema.js.map