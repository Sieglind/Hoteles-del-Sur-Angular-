import {Injectable} from "@angular/core";
import {RoomDataService} from "./room-data.service";
import {Room} from "../models/room.model";
import {Reservation} from '../models/reservation.model';
import {ReservationService} from './reservation.service';

@Injectable({
  providedIn: 'root'
})

export class AvailabilityService {

  constructor(private roomDataService: RoomDataService, private reservationService: ReservationService) {
  }

  async getAvailableRooms(reservation: Reservation): Promise<Room[]> {

    let today: Date = new Date();
    today.setHours(0, 0, 0, 0);

    reservation = this.setLocalDates(reservation);

    if ((reservation.checkInDate < today) || reservation.checkOutDate < reservation.checkInDate) {
      throw new Error("Las fechas de checkIn / checkOutDate son invalidas");
    }


    const foundReservations = await this.reservationService.getReservations();

    let reservationRoomIds: string[] = [];

    if (foundReservations) foundReservations
      .filter(fr => reservation.checkInDate <= fr.checkOutDate)
      .filter(fr => reservation.checkOutDate >= fr.checkInDate)
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

  setLocalDates(reservation : Reservation): Reservation {
    reservation.checkInDate = new Date(reservation.checkInDate + 'T00:00:00');
    reservation.checkOutDate = new Date(reservation.checkOutDate + 'T00:00:00');
    return reservation;
  }
}
