import { HydratedDocument } from 'mongoose';
export type LightCommandDocument = HydratedDocument<LightCommand>;
export declare class LightCommand {
    device_id: number;
    device_name: string;
    command: 'on' | 'off';
    executed: boolean;
    executed_at: string | null;
    created_at: string;
}
export declare const LightCommandSchema: import("mongoose").Schema<LightCommand, import("mongoose").Model<LightCommand, any, any, any, any, any, LightCommand>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LightCommand, import("mongoose").Document<unknown, {}, LightCommand, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<LightCommand & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    device_id?: import("mongoose").SchemaDefinitionProperty<number, LightCommand, import("mongoose").Document<unknown, {}, LightCommand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    device_name?: import("mongoose").SchemaDefinitionProperty<string, LightCommand, import("mongoose").Document<unknown, {}, LightCommand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    command?: import("mongoose").SchemaDefinitionProperty<"on" | "off", LightCommand, import("mongoose").Document<unknown, {}, LightCommand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    executed?: import("mongoose").SchemaDefinitionProperty<boolean, LightCommand, import("mongoose").Document<unknown, {}, LightCommand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    executed_at?: import("mongoose").SchemaDefinitionProperty<string | null, LightCommand, import("mongoose").Document<unknown, {}, LightCommand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    created_at?: import("mongoose").SchemaDefinitionProperty<string, LightCommand, import("mongoose").Document<unknown, {}, LightCommand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LightCommand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, LightCommand>;
