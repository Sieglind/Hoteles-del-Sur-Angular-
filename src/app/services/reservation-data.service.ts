import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationDataService {
  private apiUrl = 'http://localhost:3000/reservations';

  constructor(private http: HttpClient) {}

  createReservation(reservationData: Reservation): Promise<Reservation | undefined> {
    return this.http.post<Reservation | undefined>(`${this.apiUrl}`, reservationData).toPromise();
  }

  getReservationById(reservationId: string): Promise<Reservation | undefined> {
    if (!reservationId || isNaN(Number(reservationId))) {
      throw new Error("Invalid reservation ID");
    }
    return this.http.get<Reservation>(`${this.apiUrl}/${reservationId}`).toPromise();
  }

  getReservations(): Observable<Reservation[] | undefined> {
    return this.http.get<Reservation[]>(`${this.apiUrl}`);
  }

  getUserReservations(userId: string): Promise<Reservation[] | undefined> {
    return this.http.get<Reservation[]>(`${this.apiUrl}?userId=${userId}`).toPromise();
  }

  updateReservation(reservation : Reservation ): Observable <void> {
    return this.http.put<void>(`${this.apiUrl}/${reservation.id}`,reservation);
  }

  deleteReservation(reservationId: string): Promise<void> {
    if (!reservationId || isNaN(Number(reservationId))) {
      throw new Error("Invalid reservation ID");
    }
    return this.http.delete<void>(`${this.apiUrl}/${reservationId}`).toPromise();
  }
}
