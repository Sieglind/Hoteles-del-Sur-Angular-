export interface Room {
  id: string;
  type: string;
  details : roomDetails; 
}

interface roomDetails {
  capacity: number;
  pricePerNight: number;
  available: boolean;
  imageUrl: string;
}
