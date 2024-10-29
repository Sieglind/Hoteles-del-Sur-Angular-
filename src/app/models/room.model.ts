export interface Room {
  id: number;
  type: string;
  details : roomDetails;
}

interface roomDetails {
  capacity: number;
  pricePerNight: number;
  available: boolean;
}
