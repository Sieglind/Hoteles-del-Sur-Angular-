import { Component, OnInit } from '@angular/core';
import { RoomDataService } from '../../services/room-data.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent implements OnInit {

  rooms: any[] = [];

  constructor(
    private roomService: RoomDataService,
    public dialog: MatDialog) 
  {}

  async ngOnInit(): Promise<void> {
    await this.getRooms();
  }

  async openConfirmDialog(roomId: string): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      height: '200px',
      data: { roomId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancelRoom(roomId);
      }
    });
  
  }

  async cancelRoom(roomId: string): Promise<void> {
    await this.roomService.deleteRoom(roomId);
    await this.getRooms()
  }

  // async cancelRoom(roomId: string): Promise<void> {
  //   try { 
  //     await this.roomService.deleteRoom(roomId).toPromise();
  //     await this.getRooms(); 
  //   } catch (error) { 
  //     console.error('Error al eliminar la habitación:', error); 
  //   }
  // }

  async getRooms(): Promise<void> {
    const rooms = await this.roomService.getRooms();
    if (rooms) this.rooms = rooms;
  }

}
