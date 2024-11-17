export class Reservation {
  toJSON() {
    throw new Error('Method not implemented.');
  }
  id: string | undefined;
  checkInDate: Date;
  checkOutDate: Date;
  guests: number;
  roomId: string | undefined
  userId: string | undefined


  constructor(checkInDate: Date, checkOutDate: Date, guests: number) {
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.guests = guests;
  }
}
