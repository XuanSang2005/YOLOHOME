import { LightsService } from '../services/lights.service';
import { CreateCommandDto } from '../dto/create-command.dto';
import { RoomCommandDto } from '../dto/room-command.dto';
import { UpdateRoomSettingsDto } from '../dto/update-room-settings.dto';
export declare class LightsController {
    private readonly lightsService;
    constructor(lightsService: LightsService);
    getCommands(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/light-command.schema").LightCommand, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/light-command.schema").LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../schemas/light-command.schema").LightCommand, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/light-command.schema").LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[], import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/light-command.schema").LightCommand, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/light-command.schema").LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../schemas/light-command.schema").LightCommand, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/light-command.schema").LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, import("../schemas/light-command.schema").LightCommand, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/light-command.schema").LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, "find", {}>;
    sendCommand(dto: CreateCommandDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/light-command.schema").LightCommand, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/light-command.schema").LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../schemas/light-command.schema").LightCommand, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/light-command.schema").LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    getRoomSettings(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/room-setting.schema").RoomSetting, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/room-setting.schema").RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../schemas/room-setting.schema").RoomSetting, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/room-setting.schema").RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[], import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/room-setting.schema").RoomSetting, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/room-setting.schema").RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../schemas/room-setting.schema").RoomSetting, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/room-setting.schema").RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, import("../schemas/room-setting.schema").RoomSetting, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/room-setting.schema").RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, "find", {}>;
    sendRoomCommand(room: string, dto: RoomCommandDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/light-command.schema").LightCommand, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/light-command.schema").LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../schemas/light-command.schema").LightCommand, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/light-command.schema").LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateRoomSettings(room: string, dto: UpdateRoomSettingsDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/room-setting.schema").RoomSetting, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/room-setting.schema").RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../schemas/room-setting.schema").RoomSetting, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/room-setting.schema").RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
