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
exports.RoomSettingSchema = exports.RoomSetting = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let RoomSetting = class RoomSetting {
};
exports.RoomSetting = RoomSetting;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], RoomSetting.prototype, "room", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], RoomSetting.prototype, "device_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RoomSetting.prototype, "is_on", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 80, min: 0, max: 100 }),
    __metadata("design:type", Number)
], RoomSetting.prototype, "brightness", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'neutral', enum: ['warm', 'neutral', 'cool'] }),
    __metadata("design:type", String)
], RoomSetting.prototype, "color_temp", void 0);
exports.RoomSetting = RoomSetting = __decorate([
    (0, mongoose_1.Schema)({
        collection: 'room_settings',
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                delete ret._id;
                return ret;
            },
        },
    })
], RoomSetting);
exports.RoomSettingSchema = mongoose_1.SchemaFactory.createForClass(RoomSetting);
//# sourceMappingURL=room-setting.schema.js.map