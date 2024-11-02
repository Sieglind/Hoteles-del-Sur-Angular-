import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reservation} from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationDataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  createReservation(reservationData: Reservation): Promise<Reservation | undefined> {
    return this.http.post<Reservation | undefined>(`${this.apiUrl}/reservations`, reservationData).toPromise();
  }

  getReservations(): Promise<Reservation[] | undefined> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservations`).toPromise();
  }

  getReservationById(reservationId: string): Promise<Reservation[] | undefined> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservations?userId=${reservationId}`).toPromise();
  }

  updateReservation(reservationId: string, reservationData: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/reservations/${reservationId}`, reservationData);
  }

  deleteReservation(reservationId: string): Promise<void> {
    return this.http.delete<void>(`${this.apiUrl}/reservations/${reservationId}`).toPromise();
  }
}
