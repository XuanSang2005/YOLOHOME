import { HydratedDocument } from 'mongoose';
export type DeviceDocument = HydratedDocument<Device>;
export declare class Device {
    name: string;
    type: string;
    room: string;
    status: string;
    ip_address: string;
    last_seen_at: string;
}
export declare const DeviceSchema: import("mongoose").Schema<Device, import("mongoose").Model<Device, any, any, any, any, any, Device>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Device, import("mongoose").Document<unknown, {}, Device, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Device & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Device, import("mongoose").Document<unknown, {}, Device, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string, Device, import("mongoose").Document<unknown, {}, Device, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    room?: import("mongoose").SchemaDefinitionProperty<string, Device, import("mongoose").Document<unknown, {}, Device, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Device, import("mongoose").Document<unknown, {}, Device, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    ip_address?: import("mongoose").SchemaDefinitionProperty<string, Device, import("mongoose").Document<unknown, {}, Device, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    last_seen_at?: import("mongoose").SchemaDefinitionProperty<string, Device, import("mongoose").Document<unknown, {}, Device, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Device & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Device>;
