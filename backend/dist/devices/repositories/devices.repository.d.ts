import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { Device, type DeviceDocument } from '../schemas/device.schema';
import type { CreateDeviceDto } from '../dto/create-device.dto';
import { DeviceType } from '../dto/create-device.dto';
export declare class DevicesRepository implements OnModuleInit {
    private readonly model;
    constructor(model: Model<DeviceDocument>);
    onModuleInit(): Promise<void>;
    findAll(type?: DeviceType): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Device, {}, import("mongoose").DefaultSchemaOptions> & Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Device, {}, import("mongoose").DefaultSchemaOptions> & Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[], import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Device, {}, import("mongoose").DefaultSchemaOptions> & Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Device, {}, import("mongoose").DefaultSchemaOptions> & Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, Device, {}, import("mongoose").DefaultSchemaOptions> & Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, "find", {}>;
    findById(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Device, {}, import("mongoose").DefaultSchemaOptions> & Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Device, {}, import("mongoose").DefaultSchemaOptions> & Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Device, {}, import("mongoose").DefaultSchemaOptions> & Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Device, {}, import("mongoose").DefaultSchemaOptions> & Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, Device, {}, import("mongoose").DefaultSchemaOptions> & Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, "findOne", {}>;
    create(dto: CreateDeviceDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Device, {}, import("mongoose").DefaultSchemaOptions> & Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Device, {}, import("mongoose").DefaultSchemaOptions> & Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
