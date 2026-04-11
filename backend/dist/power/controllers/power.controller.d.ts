import { PowerService } from '../services/power.service';
export declare class PowerController {
    private readonly powerService;
    constructor(powerService: PowerService);
    getHistory(): import("../interfaces/power-history.interface").PowerHistory;
}
