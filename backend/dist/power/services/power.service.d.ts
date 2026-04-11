import { PowerRepository } from '../repositories/power.repository';
export declare class PowerService {
    private readonly repository;
    constructor(repository: PowerRepository);
    getHistory(): import("../interfaces/power-history.interface").PowerHistory;
}
