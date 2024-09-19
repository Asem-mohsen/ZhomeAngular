export interface Room {
  id: string;
  name: string;
  image: string;
  checked: boolean;
}

export interface RoomDesign {
  id: string;
  roomId: string; // The ID of the room it belongs to;
  image: string;
  checked: boolean;
}

export interface Furniture{
  id: string;
  name: string;
  image: string;
  checked: boolean;
}
