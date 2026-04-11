import { HydratedDocument } from 'mongoose';
export type RoomSettingDocument = HydratedDocument<RoomSetting>;
export declare class RoomSetting {
    room: string;
    device_id: number;
    is_on: boolean;
    brightness: number;
    color_temp: string;
}
export declare const RoomSettingSchema: import("mongoose").Schema<RoomSetting, import("mongoose").Model<RoomSetting, any, any, any, any, any, RoomSetting>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RoomSetting, import("mongoose").Document<unknown, {}, RoomSetting, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<RoomSetting & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    room?: import("mongoose").SchemaDefinitionProperty<string, RoomSetting, import("mongoose").Document<unknown, {}, RoomSetting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    device_id?: import("mongoose").SchemaDefinitionProperty<number, RoomSetting, import("mongoose").Document<unknown, {}, RoomSetting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    is_on?: import("mongoose").SchemaDefinitionProperty<boolean, RoomSetting, import("mongoose").Document<unknown, {}, RoomSetting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    brightness?: import("mongoose").SchemaDefinitionProperty<number, RoomSetting, import("mongoose").Document<unknown, {}, RoomSetting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    color_temp?: import("mongoose").SchemaDefinitionProperty<string, RoomSetting, import("mongoose").Document<unknown, {}, RoomSetting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RoomSetting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, RoomSetting>;
