import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationService } from '../../services/reservation.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {
  reservations: any[] = [];

  constructor(
    private reservationService: ReservationService,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getReservations();
  }

  async openConfirmDialog(reservationId: string): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      height: '200px',
      data: { reservationId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancelReservation(reservationId);
      }
    });
  }

  async cancelReservation(reservationId: string): Promise<void> {
    await this.reservationService.deleteReservation(reservationId);
    await this.getReservations()
  }

  async getReservations(){
    const reservations = await this.reservationService.getUserReservations()
    if (reservations) this.reservations = reservations;
  }
}
