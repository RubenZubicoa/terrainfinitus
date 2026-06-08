export type HotelId = 'peralejos' | 'bugarra' | 'the-lake';

export type ReservationStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Hotel {
  id: HotelId;
  nameKey: string;
  locationKey: string;
  image: string;
}

export interface Room {
  id: string;
  hotelId: HotelId;
  nameKey: string;
  descriptionKey: string;
  image: string;
  sizeM2: number;
  capacity: number;
  pricePerNight: number;
  amenityKeys: string[];
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
