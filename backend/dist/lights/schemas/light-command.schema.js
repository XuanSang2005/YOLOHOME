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
exports.LightCommandSchema = exports.LightCommand = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let LightCommand = class LightCommand {
};
exports.LightCommand = LightCommand;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], LightCommand.prototype, "device_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LightCommand.prototype, "device_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['on', 'off'] }),
    __metadata("design:type", String)
], LightCommand.prototype, "command", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], LightCommand.prototype, "executed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], LightCommand.prototype, "executed_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: () => new Date().toISOString() }),
    __metadata("design:type", String)
], LightCommand.prototype, "created_at", void 0);
exports.LightCommand = LightCommand = __decorate([
    (0, mongoose_1.Schema)({
        collection: 'light_commands',
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                delete ret._id;
                return ret;
            },
        },
    })
], LightCommand);
exports.LightCommandSchema = mongoose_1.SchemaFactory.createForClass(LightCommand);
//# sourceMappingURL=light-command.schema.js.map