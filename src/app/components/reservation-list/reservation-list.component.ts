import {Component, OnInit} from '@angular/core';
import {ReservationService} from '../../services/reservation.service';
import {Router} from '@angular/router';
import {Reservation} from '../../models/reservation.model';
import {CustomValidators} from '../../validators/custom-validators';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  errorMessage: string | null = null;

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {
  }

  async onEdit(reservationId: string | undefined): Promise<void> {
    await this.router.navigate([`/reservations/edit/${reservationId}`]);
  }

  ngOnInit(): void {
    this.loadReservations();
  }

  async loadReservations(): Promise<void> {
    this.reservationService.getReservations().subscribe(
      reservations => this.reservations = reservations,
    )
  }

  async onCancel(reservation: any): Promise<void> {
    try {
      await this.reservationService.deleteReservation(reservation.id);
      this.reservations = this.reservations.filter(r => r.id !== reservation.id);
    } catch (error) {
      this.errorMessage = 'Error al cancelar la reserva.';
      console.error(error);
    }
  }

  dateIsInvalid(reservation: Reservation): boolean {
    return !CustomValidators.dateIsBeforeToday(reservation.checkInDate);
  }
}
