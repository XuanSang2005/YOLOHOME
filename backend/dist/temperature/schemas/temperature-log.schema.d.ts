import { HydratedDocument } from 'mongoose';
export type TemperatureLogDocument = HydratedDocument<TemperatureLog>;
export declare class TemperatureLog {
    device_id: number;
    temperature: number;
    humidity: number;
    light_intensity: number | null;
    air_quality: number | null;
    created_at: string;
}
export declare const TemperatureLogSchema: import("mongoose").Schema<TemperatureLog, import("mongoose").Model<TemperatureLog, any, any, any, any, any, TemperatureLog>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TemperatureLog, import("mongoose").Document<unknown, {}, TemperatureLog, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TemperatureLog & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    device_id?: import("mongoose").SchemaDefinitionProperty<number, TemperatureLog, import("mongoose").Document<unknown, {}, TemperatureLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TemperatureLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    temperature?: import("mongoose").SchemaDefinitionProperty<number, TemperatureLog, import("mongoose").Document<unknown, {}, TemperatureLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TemperatureLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    humidity?: import("mongoose").SchemaDefinitionProperty<number, TemperatureLog, import("mongoose").Document<unknown, {}, TemperatureLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TemperatureLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    light_intensity?: import("mongoose").SchemaDefinitionProperty<number | null, TemperatureLog, import("mongoose").Document<unknown, {}, TemperatureLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TemperatureLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    air_quality?: import("mongoose").SchemaDefinitionProperty<number | null, TemperatureLog, import("mongoose").Document<unknown, {}, TemperatureLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TemperatureLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    created_at?: import("mongoose").SchemaDefinitionProperty<string, TemperatureLog, import("mongoose").Document<unknown, {}, TemperatureLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TemperatureLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, TemperatureLog>;
