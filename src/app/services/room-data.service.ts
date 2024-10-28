import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomDataService {
  private apiUrl = 'http://localhost:3000/rooms'; // Asegúrate de que la URL coincida con la de tu backend

  constructor(private http: HttpClient) {}

  getRoomAvailability(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}`);
  }

  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}`, room);
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}`);
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
  }

  updateRoom(id: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/${id}`, room);
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
