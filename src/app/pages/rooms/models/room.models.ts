export type HotelId = 'peralejos' | 'bugarra' | 'the-lake';

export type RoomType = 'junior-suite' | 'suite' | 'presidential' | 'commodore' | 'bungalow';

export type ReservationStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Hotel {
  id: HotelId;
  nameKey: string;
  locationKey: string;
  image: string;
  catalogLayout?: 'grouped' | 'flat' | 'preparation';
}

export interface RoomTypeDefinition {
  id: RoomType;
  labelKey: string;
}

export interface RoomImage {
  src: string;
  altKey: string;
}

export interface Room {
  id: string;
  hotelId: HotelId;
  type: RoomType;
  roomNumber: string;
  nameKey: string;
  descriptionKey: string;
  detailKey: string;
  image: string;
  images: RoomImage[];
  sizeM2: number;
  capacity: number;
  pricePerNight: number;
  bedTypeKey: string;
  viewKey: string;
  bathroomKey: string;
  amenityKeys: string[];
  featureKeys: string[];
}

export interface RoomTypeGroup {
  type: RoomType;
  labelKey: string;
  rooms: Room[];
}

export interface Reservation {
  id: string;
  hotelId: HotelId;
  roomId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: ReservationStatus;
  notes: string;
}

export interface BookingDraft {
  roomId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  notes: string;
}
