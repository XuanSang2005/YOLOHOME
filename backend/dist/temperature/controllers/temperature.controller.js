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
exports.TemperatureController = void 0;
const common_1 = require("@nestjs/common");
const temperature_service_1 = require("../services/temperature.service");
let TemperatureController = class TemperatureController {
    constructor(temperatureService) {
        this.temperatureService = temperatureService;
    }
    getLogs() {
        return this.temperatureService.getLogs();
    }
    getCurrent() {
        return this.temperatureService.getCurrentReading();
    }
};
exports.TemperatureController = TemperatureController;
__decorate([
    (0, common_1.Get)('logs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TemperatureController.prototype, "getLogs", null);
__decorate([
    (0, common_1.Get)('current'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TemperatureController.prototype, "getCurrent", null);
exports.TemperatureController = TemperatureController = __decorate([
    (0, common_1.Controller)('temperature'),
    __metadata("design:paramtypes", [temperature_service_1.TemperatureService])
], TemperatureController);
//# sourceMappingURL=temperature.controller.js.map