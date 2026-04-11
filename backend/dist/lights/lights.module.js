"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const lights_controller_1 = require("./controllers/lights.controller");
const lights_service_1 = require("./services/lights.service");
const lights_repository_1 = require("./repositories/lights.repository");
const light_command_schema_1 = require("./schemas/light-command.schema");
const room_setting_schema_1 = require("./schemas/room-setting.schema");
let LightsModule = class LightsModule {
};
exports.LightsModule = LightsModule;
exports.LightsModule = LightsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: light_command_schema_1.LightCommand.name, schema: light_command_schema_1.LightCommandSchema },
                { name: room_setting_schema_1.RoomSetting.name, schema: room_setting_schema_1.RoomSettingSchema },
            ]),
        ],
        controllers: [lights_controller_1.LightsController],
        providers: [lights_service_1.LightsService, lights_repository_1.LightsRepository],
    })
], LightsModule);
//# sourceMappingURL=lights.module.js.map