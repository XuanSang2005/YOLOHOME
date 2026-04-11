import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { LightCommand, type LightCommandDocument } from '../schemas/light-command.schema';
import { RoomSetting, type RoomSettingDocument } from '../schemas/room-setting.schema';
import type { UpdateRoomSettingsDto } from '../dto/update-room-settings.dto';
export declare class LightsRepository implements OnModuleInit {
    private readonly commandModel;
    private readonly roomModel;
    constructor(commandModel: Model<LightCommandDocument>, roomModel: Model<RoomSettingDocument>);
    onModuleInit(): Promise<void>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LightCommand, {}, import("mongoose").DefaultSchemaOptions> & LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, LightCommand, {}, import("mongoose").DefaultSchemaOptions> & LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[], import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LightCommand, {}, import("mongoose").DefaultSchemaOptions> & LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, LightCommand, {}, import("mongoose").DefaultSchemaOptions> & LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, LightCommand, {}, import("mongoose").DefaultSchemaOptions> & LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, "find", {}>;
    getRoomSettings(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, RoomSetting, {}, import("mongoose").DefaultSchemaOptions> & RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, RoomSetting, {}, import("mongoose").DefaultSchemaOptions> & RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[], import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, RoomSetting, {}, import("mongoose").DefaultSchemaOptions> & RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, RoomSetting, {}, import("mongoose").DefaultSchemaOptions> & RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, RoomSetting, {}, import("mongoose").DefaultSchemaOptions> & RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, "find", {}>;
    updateRoomSettings(room: string, dto: UpdateRoomSettingsDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, RoomSetting, {}, import("mongoose").DefaultSchemaOptions> & RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, RoomSetting, {}, import("mongoose").DefaultSchemaOptions> & RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    sendRoomCommand(room: string, command: 'on' | 'off'): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LightCommand, {}, import("mongoose").DefaultSchemaOptions> & LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, LightCommand, {}, import("mongoose").DefaultSchemaOptions> & LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    create(command: 'on' | 'off'): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LightCommand, {}, import("mongoose").DefaultSchemaOptions> & LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, LightCommand, {}, import("mongoose").DefaultSchemaOptions> & LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
}
