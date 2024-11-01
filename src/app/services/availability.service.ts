import {Injectable} from "@angular/core";
import {RoomDataService} from "./room-data.service";
import {ReservationDataService} from "./reservation-data.service";
import {Room} from "../models/room.model";
import {Reservation} from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})

export class AvailabilityService {

  constructor(private roomDataService: RoomDataService, private reservationDataService: ReservationDataService) {
  }

  async getAvailableRooms(reservation: Reservation): Promise<Room[]> {
    let today: Date = new Date();
    today.setHours(0, 0, 0, 0);

    if ((reservation.checkInDate < today) || reservation.checkOutDate < reservation.checkInDate) {
      throw new Error("Las fechas de checkIn / checkOutDate son invalidas");
    }


    const foundReservations = await this.reservationDataService.getReservations();

    let reservationRoomIds: string[] = [];

    if (foundReservations) foundReservations
      .filter(fr => {
        return fr.checkOutDate && reservation.checkInDate <= new Date(fr.checkOutDate)
      })
      .filter(fr => fr.checkInDate && reservation.checkOutDate >= new Date(fr.checkInDate))
      .forEach(fr => {
        if (fr.roomId) reservationRoomIds.push(fr.roomId)
      });

    console.log(reservationRoomIds);

    const foundRooms = await this.roomDataService.getRooms();
    return foundRooms ? foundRooms
      .filter(fr => fr.details.available)
      .filter(fr => !reservationRoomIds.includes(fr.id))
      .filter(fr => fr.details.capacity >= reservation.guests) : [];
  }
}
