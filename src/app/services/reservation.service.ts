import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation.model';
import { ReservationDataService } from './reservation-data.service';
import { UserService } from './user.service';
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
    const userId = this.userService.getUserId();
    if (userId) {
      reservation.userId = userId;
      const createdReservation = await this.reservationDataService.createReservation(reservation);
      if (createdReservation) {
        return createdReservation.id;
      } else {
        throw new Error("Error creating reservation");
      }
    } else {
      throw new Error("User ID is not available");
    }
  }

  async getReservation(reservationId: string): Promise<Reservation | undefined> {
    console.log('Checking reservationId:', reservationId);
    if (!reservationId || isNaN(Number(reservationId))) {
      throw new Error("Invalid reservation ID");
    }
    return await this.reservationDataService.getReservationById(reservationId);
  }

  async getUserReservations(): Promise<Reservation[] | undefined> {
    const userId = this.userService.getUserId();
    let reservations: Reservation[] = [];
    if (userId) {
      const foundReservations = await this.reservationDataService.getUserReservations(userId);
      if (foundReservations) {
        foundReservations.forEach(reservation => this.setLocalDate(reservation));
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
    if (!id || isNaN(Number(id))) {
      throw new Error("Invalid reservation ID");
    }
    await this.reservationDataService.deleteReservation(id);
  }

  async updateReservation(reservationId: string, reservation: Partial<Reservation>): Promise<void> {
    if (!reservationId || isNaN(Number(reservationId))) {
      throw new Error("Invalid reservation ID");
    }
    try {
      await this.reservationDataService.updateReservation(reservationId, reservation);
    } catch (error) {
      console.error('Error al actualizar la reserva:', error);
      throw error; 
    }
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
