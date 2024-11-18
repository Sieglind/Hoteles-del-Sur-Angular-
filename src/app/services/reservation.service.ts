import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation.model';
import {ReservationDataService} from './reservation-data.service';
import {UserService} from './user.service';
import {map, Observable} from 'rxjs';
import {CustomValidators} from '../validators/custom-validators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private reservationDataService: ReservationDataService,
    private userService: UserService
  ) {}

  async createReservation(reservation: Reservation): Promise<string | undefined> {
    let userId : string | undefined = this.userService.getUserId();
    if (userId) {
      reservation.userId = userId;
      let createdReservation : Reservation | undefined = await this.reservationDataService.createReservation(reservation);
      if (createdReservation) {
        return createdReservation.id;
      } else {
        throw new Error("Error creating reservation");
      }
    } else {
      throw new Error("Error creating reservation");
    }
  }

  async getReservation(reservationId: string): Promise<Reservation | undefined> {
    return await this.reservationDataService.getReservationById(reservationId);
  }

  async getUserReservations(): Promise<Reservation[] | undefined> {
    let userId : string | undefined = this.userService.getUserId();
    let reservations : Reservation[] = [];
    if(userId){
      const foundReservations = await this.reservationDataService.getUserReservations(userId);
      if (foundReservations) {
        foundReservations.forEach(reservation => this.setLocalDate(reservation))
        reservations = foundReservations;
      }
    }
    return reservations;
  }

  getMatchingReservationIds(checkIn: Date, checkOut: Date): Observable<String[]> {
    return this.reservationDataService.getReservations().pipe(
      map(reservations =>
        reservations ? reservations
            .filter(reservation => checkIn <= reservation.checkOutDate)
            .filter(reservation => reservation.checkInDate <= checkOut)
            .map(reservation => reservation.roomId)
            .filter(roomId => roomId !== undefined)
          : []
      )
    );
  }

  async deleteReservation(id: string): Promise<void> {
    await this.reservationDataService.deleteReservation(id);
  }

  setLocalDate(reservation: Reservation): Reservation {
    reservation.checkInDate = new Date(reservation.checkInDate);
    reservation.checkOutDate = new Date(reservation.checkOutDate);
    return reservation;
  }
}
