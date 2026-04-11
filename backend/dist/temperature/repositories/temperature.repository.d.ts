import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { TemperatureLog, type TemperatureLogDocument } from '../schemas/temperature-log.schema';
export declare class TemperatureRepository implements OnModuleInit {
    private readonly model;
    constructor(model: Model<TemperatureLogDocument>);
    onModuleInit(): Promise<void>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TemperatureLog, {}, import("mongoose").DefaultSchemaOptions> & TemperatureLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, TemperatureLog, {}, import("mongoose").DefaultSchemaOptions> & TemperatureLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[], import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TemperatureLog, {}, import("mongoose").DefaultSchemaOptions> & TemperatureLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, TemperatureLog, {}, import("mongoose").DefaultSchemaOptions> & TemperatureLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, TemperatureLog, {}, import("mongoose").DefaultSchemaOptions> & TemperatureLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, "find", {}>;
    findLatest(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TemperatureLog, {}, import("mongoose").DefaultSchemaOptions> & TemperatureLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, TemperatureLog, {}, import("mongoose").DefaultSchemaOptions> & TemperatureLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TemperatureLog, {}, import("mongoose").DefaultSchemaOptions> & TemperatureLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, TemperatureLog, {}, import("mongoose").DefaultSchemaOptions> & TemperatureLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, TemperatureLog, {}, import("mongoose").DefaultSchemaOptions> & TemperatureLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, "findOne", {}>;
}
