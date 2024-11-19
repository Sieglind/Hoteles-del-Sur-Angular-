import {Injectable} from '@angular/core';
import {RoomDataService} from './room-data.service';
import {catchError, map, Observable, of} from 'rxjs';
import {Room} from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private roomDataService: RoomDataService) {
  }

  getAvailableRooms(): Observable<Room[]> {
    return this.roomDataService.getRooms().pipe(
      map(rooms => rooms ? rooms.filter(room => room.details.available) : []),
      catchError(() => of([]))
    )
  }

  roomExists(id: string): Observable<boolean> {
    return this.roomDataService.getRoomById(id).pipe(
      map(rooms => rooms.length > 0),
      catchError(() => of(false))
    )
  }

  createRoom(room: any): Observable<Room | undefined> {
    return this.roomDataService.createRoom(room)
  }
}
