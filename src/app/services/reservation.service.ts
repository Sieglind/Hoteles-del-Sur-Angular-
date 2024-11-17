import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation.model';
import {ReservationDataService} from './reservation-data.service';
import {UserService} from './user.service';
import { lastValueFrom } from 'rxjs';

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

  async getReservations(): Promise<Reservation[] | undefined> {
    const foundReservations = await this.reservationDataService.getReservations();
    if (foundReservations) foundReservations.forEach(reservation => this.setLocalDate(reservation));
    return foundReservations;
  }

  async deleteReservation(id: string): Promise<void> {
    await this.reservationDataService.deleteReservation(id);
  }
  
  updateReservation(reservation: Reservation): Promise<void> {
    return this.http.put<void>(`${this.apiUrl}/${reservation.id}`, reservation).toPromise();
  }
  

  fetchReservations(): Promise<Reservation[]> {
    return lastValueFrom(
      this.http.get<Reservation[]>(`${this.apiUrl}/reservations`)
    )
    .then(reservations => 
      reservations?.sort((a, b) => new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime()) || []
    );
  }


  setLocalDate(reservation: Reservation): Reservation {
    reservation.checkInDate = new Date(reservation.checkInDate);
    reservation.checkOutDate = new Date(reservation.checkOutDate);
    return reservation;
  }
}
