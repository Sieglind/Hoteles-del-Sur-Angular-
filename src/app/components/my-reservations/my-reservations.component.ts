import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationService } from '../../services/reservation.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {
  reservations: any[] = [];

  constructor(private reservationService: ReservationService, public dialog: MatDialog,private authService: AuthService) {}

  ngOnInit(): void {
    { const userId = this.authService.getCurrentUser().id
      this.reservationService.getReservations().subscribe(data => {
        this.reservations = data.filter(reservation => reservation.userId === userId);
      });
    
  }
}

  openConfirmDialog(reservationId: string): void {
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

  cancelReservation(reservationId: string): void {
    this.reservationService.deleteReservation(reservationId).subscribe(() => {
      this.reservations = this.reservations.filter(res => res.id !== reservationId);
    });
  }
}