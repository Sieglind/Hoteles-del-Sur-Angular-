import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../models/room.model';
import {catchError, map, Observable, of} from 'rxjs';

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

  getRoomById(id: string): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}?id=${id}`);
  }

  roomExists(id: string): Observable<boolean> {
    return this.getRoomById(id).pipe(
      map(room => !!room),
      catchError(() => of(false))
    )
  }

  updateRoom(id: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}?id=${id}`, room);
  }

  // deleteRoom(id: string): Observable<void> { 
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);  
  // }

  deleteRoom(roomId: string): Promise<void> {
    return this.http.delete<void>(`${this.apiUrl}/${roomId}`).toPromise();
  }

}
