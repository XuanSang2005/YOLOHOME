import { DevicesRepository } from '../repositories/devices.repository';
import type { CreateDeviceDto, DeviceType } from '../dto/create-device.dto';
export declare class DevicesService {
    private readonly repository;
    constructor(repository: DevicesRepository);
    findAll(type?: DeviceType): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/device.schema").Device, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/device.schema").Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../schemas/device.schema").Device, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/device.schema").Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[], import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/device.schema").Device, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/device.schema").Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../schemas/device.schema").Device, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/device.schema").Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, import("../schemas/device.schema").Device, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/device.schema").Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, "find", {}>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/device.schema").Device, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/device.schema").Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../schemas/device.schema").Device, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/device.schema").Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    create(dto: CreateDeviceDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/device.schema").Device, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/device.schema").Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../schemas/device.schema").Device, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/device.schema").Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
