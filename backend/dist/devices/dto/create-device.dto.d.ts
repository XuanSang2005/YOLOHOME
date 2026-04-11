export declare enum DeviceType {
    LIGHT = "light",
    SENSOR = "sensor",
    CAMERA = "camera"
}
export declare enum DeviceRoom {
    LIVING_ROOM = "Living Room",
    BEDROOM = "Bedroom",
    KITCHEN = "Kitchen",
    FRONT_DOOR = "Front Door"
}
export declare class CreateDeviceDto {
    name: string;
    type: DeviceType;
    room: DeviceRoom;
    ip_address?: string;
    status?: 'on' | 'off';
}
