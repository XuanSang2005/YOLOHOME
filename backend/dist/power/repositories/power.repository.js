"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerRepository = void 0;
const common_1 = require("@nestjs/common");
const BARS = [
    0, 0, 0.2, 0.4, 0, 0, 0.6, 1, 0.8, 1, 0.6, 0.4,
    0, 0, 0.3, 0.7, 1, 1, 0.9, 0.5, 0, 0, 0.4, 0.8,
    1, 1, 0.7, 0.3, 0, 0.5, 0.9, 1, 0.8, 0.6, 0.4, 1,
];
const WATTAGE = 0.06;
let PowerRepository = class PowerRepository {
    constructor() {
        this.history = {
            bars: BARS,
            total_kwh: parseFloat(BARS.reduce((s, v) => s + v * (5 / 60) * WATTAGE, 0).toFixed(2)),
            trend: '+7.8%',
            time_start: '10:00',
            time_end: '13:00',
        };
    }
    getHistory() {
        return this.history;
    }
};
exports.PowerRepository = PowerRepository;
exports.PowerRepository = PowerRepository = __decorate([
    (0, common_1.Injectable)()
], PowerRepository);
//# sourceMappingURL=power.repository.js.map