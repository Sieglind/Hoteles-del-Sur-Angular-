export interface Reservation {
    id: string;
    checkInDate: Date;
    checkOutDate: Date;
    guests: number;
    roomId: string;
}
