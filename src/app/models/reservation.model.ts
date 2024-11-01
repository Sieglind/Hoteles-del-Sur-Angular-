export class Reservation {
  id: string | undefined;
  checkInDate: Date;
  checkOutDate: Date;
  guests: number;
  roomId: string | undefined;
  userId: string | undefined


  constructor(checkInDate: Date, checkOutDate: Date, guests: number, userId: string) {
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.guests = guests;
    this.userId = userId;
  }
}
