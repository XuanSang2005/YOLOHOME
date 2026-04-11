"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const temperature_controller_1 = require("./controllers/temperature.controller");
const temperature_service_1 = require("./services/temperature.service");
const temperature_repository_1 = require("./repositories/temperature.repository");
const temperature_log_schema_1 = require("./schemas/temperature-log.schema");
let TemperatureModule = class TemperatureModule {
};
exports.TemperatureModule = TemperatureModule;
exports.TemperatureModule = TemperatureModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: temperature_log_schema_1.TemperatureLog.name, schema: temperature_log_schema_1.TemperatureLogSchema }])],
        controllers: [temperature_controller_1.TemperatureController],
        providers: [temperature_service_1.TemperatureService, temperature_repository_1.TemperatureRepository],
    })
], TemperatureModule);
//# sourceMappingURL=temperature.module.js.map