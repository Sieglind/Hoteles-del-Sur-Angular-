import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  onEdit(reservation: any): void {
    console.log('Editando reserva:', reservation);
    this.router.navigate(['/edit-reservation', reservation.id]);
  }
  ngOnInit(): void {
    this.loadReservations();
  }

  async loadReservations(): Promise<void> {
    try {
      this.reservations = await this.reservationService.fetchReservations();
    } catch (error) {
      this.errorMessage = "Error al cargar las reservas. Inténtelo nuevamente.";
      console.error(error);
    }
  }

  async onCancel(reservation: any): Promise<void> {
    console.log('Cancelando reserva:', reservation);
    try {
      await this.reservationService.deleteReservation(reservation.id);
      this.reservations = this.reservations.filter(r => r.id !== reservation.id);
    } catch (error) {
      this.errorMessage = 'Error al cancelar la reserva.';
      console.error(error);
    }
  }
}
