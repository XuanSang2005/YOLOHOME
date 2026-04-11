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
exports.DevicesService = void 0;
const common_1 = require("@nestjs/common");
const devices_repository_1 = require("../repositories/devices.repository");
let DevicesService = class DevicesService {
    constructor(repository) {
        this.repository = repository;
    }
    findAll(type) {
        return this.repository.findAll(type);
    }
    async findById(id) {
        const device = await this.repository.findById(id);
        if (!device)
            throw new common_1.NotFoundException(`Device #${id} not found`);
        return device;
    }
    create(dto) {
        return this.repository.create(dto);
    }
};
exports.DevicesService = DevicesService;
exports.DevicesService = DevicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [devices_repository_1.DevicesRepository])
], DevicesService);
//# sourceMappingURL=devices.service.js.map