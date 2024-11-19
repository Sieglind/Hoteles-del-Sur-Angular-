import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/room.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomDataService } from '../../services/room-data.service';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrl: './view-room.component.css'
})
export class ViewRoomComponent implements OnInit{

  room: Room | undefined;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomDataService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    const roomId = this.route.snapshot.params['id']; 
    this.roomService.getRoomById(roomId).subscribe( 
      (rooms) => { 
        this.room = rooms[0];
      }, 
      (error) => console.error('Error al obtener la habitación:', error) );    
  }

  goToRooms() {
    this.router.navigate(['/rooms/list']);
  }

}
