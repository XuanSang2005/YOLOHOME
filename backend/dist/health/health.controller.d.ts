import { ConfigService } from '@nestjs/config';
export declare class HealthController {
    private readonly config;
    constructor(config: ConfigService);
    check(): {
        status: string;
        service: string;
        environment: string;
        timestamp: string;
    };
}
