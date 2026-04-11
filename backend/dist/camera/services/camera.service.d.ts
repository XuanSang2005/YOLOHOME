import { CameraRepository } from '../repositories/camera.repository';
import type { CameraCommandDto } from '../dto/camera-command.dto';
export declare class CameraService {
    private readonly repository;
    constructor(repository: CameraRepository);
    getLogs(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/camera-log.schema").CameraLog, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/camera-log.schema").CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../schemas/camera-log.schema").CameraLog, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/camera-log.schema").CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[], import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/camera-log.schema").CameraLog, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/camera-log.schema").CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../schemas/camera-log.schema").CameraLog, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/camera-log.schema").CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, import("../schemas/camera-log.schema").CameraLog, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/camera-log.schema").CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, "find", {}>;
    sendCommand(dto: CameraCommandDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/camera-log.schema").CameraLog, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/camera-log.schema").CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../schemas/camera-log.schema").CameraLog, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/camera-log.schema").CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
