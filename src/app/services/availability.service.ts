import { Injectable } from "@angular/core";
import { RoomDataService } from "./room-data.service";
import { ReservationDataService } from "./reservation-data.service";
import { Room } from "../models/room.model";
import { forkJoin, map, Observable, of } from "rxjs";
import { Reservation } from "../models/reservation.model";

@Injectable({
    providedIn:'root'
})

export class availabilityService{

    constructor (private roomDataService: RoomDataService, private reservationDataService : ReservationDataService){}

    getAvailability(checkInDate: Date, checkOutDate: Date): Observable<Room[]>{
        
        const today = new Date();

        if(new Date(checkInDate) < new Date(today)){
            throw new Error('La fechag del check-in no puede ser anterior al dia de hoy.')
        }

        if(new Date(checkOutDate) < new Date(checkInDate)){
            throw new Error('La fecha de check-out no puede ser anterior a la de check-in')
        }
        
        return forkJoin([this.roomDataService.getAvailableRooms(),this.reservationDataService.getReservations()]).pipe(
            map(([rooms,reservations])=>this.filterAvailableRooms(rooms,reservations,checkInDate,checkOutDate)));
        
    }
    filterAvailableRooms(rooms: Room[], reservations: Reservation[],checkInDate: Date, checkOutDate: Date): Room[]{
            return rooms.filter(room => {
                return !reservations.some(reservations =>
                    reservations.roomId === room.id.toString() && (
                        (new Date(reservations.checkInDate) <= new Date(checkOutDate) && new Date(reservations.checkInDate) >= new Date(checkInDate)) ||
                        (new Date(reservations.checkOutDate) <= new Date(checkOutDate) && new Date(reservations.checkOutDate)>= new Date(checkInDate))   
                    )                     
                );
            });
    }
}