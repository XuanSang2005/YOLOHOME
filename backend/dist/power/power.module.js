"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerModule = void 0;
const common_1 = require("@nestjs/common");
const power_controller_1 = require("./controllers/power.controller");
const power_service_1 = require("./services/power.service");
const power_repository_1 = require("./repositories/power.repository");
let PowerModule = class PowerModule {
};
exports.PowerModule = PowerModule;
exports.PowerModule = PowerModule = __decorate([
    (0, common_1.Module)({
        controllers: [power_controller_1.PowerController],
        providers: [power_service_1.PowerService, power_repository_1.PowerRepository],
    })
], PowerModule);
//# sourceMappingURL=power.module.js.map