import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Room} from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomDataService {
  private apiUrl = 'http://localhost:3000/rooms';

  constructor(private http: HttpClient) {
  }

  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}`, room);
  }

  getRooms(): Promise<Room[] | undefined> {
    return this.http.get<Room[]>(`${this.apiUrl}`).toPromise();
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}?id=${id}`);
  }

  updateRoom(id: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}?id=${id}`, room);
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`);
  }
}
