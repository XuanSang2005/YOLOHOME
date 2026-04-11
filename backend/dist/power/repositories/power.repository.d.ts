import type { PowerHistory } from '../interfaces/power-history.interface';
export declare class PowerRepository {
    private readonly history;
    getHistory(): PowerHistory;
}
