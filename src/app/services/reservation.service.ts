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

  createReservation(reservationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservations`, reservationData);
  }

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reservations`);
  }
}
