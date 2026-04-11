import { HydratedDocument } from 'mongoose';
export type CameraLogDocument = HydratedDocument<CameraLog>;
export declare class CameraLog {
    user_id: number | null;
    device_id: number | null;
    event: 'camera_on' | 'camera_off' | 'face_detected';
    face_label: string | null;
    note: string | null;
    created_at: string;
}
export declare const CameraLogSchema: import("mongoose").Schema<CameraLog, import("mongoose").Model<CameraLog, any, any, any, any, any, CameraLog>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CameraLog, import("mongoose").Document<unknown, {}, CameraLog, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<CameraLog & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    user_id?: import("mongoose").SchemaDefinitionProperty<number | null, CameraLog, import("mongoose").Document<unknown, {}, CameraLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    device_id?: import("mongoose").SchemaDefinitionProperty<number | null, CameraLog, import("mongoose").Document<unknown, {}, CameraLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    event?: import("mongoose").SchemaDefinitionProperty<"camera_on" | "camera_off" | "face_detected", CameraLog, import("mongoose").Document<unknown, {}, CameraLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    face_label?: import("mongoose").SchemaDefinitionProperty<string | null, CameraLog, import("mongoose").Document<unknown, {}, CameraLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    note?: import("mongoose").SchemaDefinitionProperty<string | null, CameraLog, import("mongoose").Document<unknown, {}, CameraLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    created_at?: import("mongoose").SchemaDefinitionProperty<string, CameraLog, import("mongoose").Document<unknown, {}, CameraLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CameraLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, CameraLog>;
