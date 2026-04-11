import { DevicesService } from '../services/devices.service';
import { CreateDeviceDto, DeviceType } from '../dto/create-device.dto';
export declare class DevicesController {
    private readonly devicesService;
    constructor(devicesService: DevicesService);
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
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/device.schema").Device, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/device.schema").Device & {
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
