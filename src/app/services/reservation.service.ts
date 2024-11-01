import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createReservation(reservation: Reservation): Observable<Reservation> {
    console.log(reservation);
    return this.http.post<Reservation>(`${this.apiUrl}/reservations`, reservation);
  }

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reservations`);
  }

  deleteReservation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reservations/${id}`);
  }
}
