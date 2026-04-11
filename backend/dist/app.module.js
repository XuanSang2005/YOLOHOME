"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const health_module_1 = require("./health/health.module");
const devices_module_1 = require("./devices/devices.module");
const lights_module_1 = require("./lights/lights.module");
const temperature_module_1 = require("./temperature/temperature.module");
const camera_module_1 = require("./camera/camera.module");
const power_module_1 = require("./power/power.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env.local', '.env'],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => ({
                    uri: config.get('MONGODB_URI'),
                }),
                inject: [config_1.ConfigService],
            }),
            health_module_1.HealthModule,
            devices_module_1.DevicesModule,
            lights_module_1.LightsModule,
            temperature_module_1.TemperatureModule,
            camera_module_1.CameraModule,
            power_module_1.PowerModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map