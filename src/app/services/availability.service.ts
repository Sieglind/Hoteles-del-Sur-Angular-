import {Injectable} from "@angular/core";
import {Room} from "../models/room.model";
import {ReservationService} from './reservation.service';
import {RoomService} from './room.service';
import {catchError, map, Observable, of, switchMap} from 'rxjs';
import {CustomValidators as Dates} from '../validators/custom-validators';

@Injectable({
  providedIn: 'root'
})

export class AvailabilityService {

  constructor(private roomService: RoomService, private reservationService: ReservationService) {
  }

  getAvailableRooms(reservationForm: any): Observable<Room[]> {

    if (Dates.dateIsBeforeToday(reservationForm.checkInDate) ||
      Dates.checkoutIsBeforeCheckIn(reservationForm.checkInDate, reservationForm.checkOutDate)) {
      throw new Error("Las fechas de checkIn / checkOutDate son invalidas");
    }

    return this.reservationService.getMatchingReservationIds(reservationForm.checkInDate, reservationForm.checkOutDate)
      .pipe(switchMap(reservationIds => this.roomService.getAvailableRooms()
          .pipe(
            map(rooms => rooms
              .filter(room => room.details.capacity >= reservationForm.guests)
              .map(room => {
                room.details.available = !reservationIds.includes(room.id);
                return room;
              })
            )
          )
        ),
        catchError(error => {
          console.error("Error fetching reservations or rooms:", error);
          return of([]);
        })
      );
  }
}
