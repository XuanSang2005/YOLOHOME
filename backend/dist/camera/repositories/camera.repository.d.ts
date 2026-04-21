import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { CameraLog, type CameraLogDocument } from '../schemas/camera-log.schema';
export declare class CameraRepository implements OnModuleInit {
    private readonly model;
    constructor(model: Model<CameraLogDocument>);
    onModuleInit(): Promise<void>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, CameraLog, {}, import("mongoose").DefaultSchemaOptions> & CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, CameraLog, {}, import("mongoose").DefaultSchemaOptions> & CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[], import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, CameraLog, {}, import("mongoose").DefaultSchemaOptions> & CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, CameraLog, {}, import("mongoose").DefaultSchemaOptions> & CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, CameraLog, {}, import("mongoose").DefaultSchemaOptions> & CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, "find", {}>;
    createLog(command: 'on' | 'off'): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, CameraLog, {}, import("mongoose").DefaultSchemaOptions> & CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, CameraLog, {}, import("mongoose").DefaultSchemaOptions> & CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createFaceLog(faceLabel: string, authorized: number): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, CameraLog, {}, import("mongoose").DefaultSchemaOptions> & CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, CameraLog, {}, import("mongoose").DefaultSchemaOptions> & CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
