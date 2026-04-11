export interface TemperatureLog {
    id: number;
    device_id: number;
    temperature: number;
    humidity: number;
    light_intensity?: number;
    air_quality?: number;
    created_at: string;
}
