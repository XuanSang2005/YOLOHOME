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
exports.PowerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const power_service_1 = require("../services/power.service");
let PowerController = class PowerController {
    constructor(powerService) {
        this.powerService = powerService;
    }
    getHistory() {
        return this.powerService.getHistory();
    }
};
exports.PowerController = PowerController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử tiêu thụ điện năng theo tuần' }),
    (0, common_1.Get)('history'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PowerController.prototype, "getHistory", null);
exports.PowerController = PowerController = __decorate([
    (0, swagger_1.ApiTags)('Power'),
    (0, common_1.Controller)('power'),
    __metadata("design:paramtypes", [power_service_1.PowerService])
], PowerController);
//# sourceMappingURL=power.controller.js.map