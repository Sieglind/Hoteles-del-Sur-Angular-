import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation.model';
import { ReservationDataService } from '../../services/reservation-data.service';
import { CustomValidators } from '../../validators/custom-validators';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {
  editForm: FormGroup; // Initialize the form group immediately
  reservationId: string | null = null;
  reservation: Reservation | undefined;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private reservationDataService: ReservationDataService
  ) {
    // Initialize the form to prevent undefined errors
    this.editForm = this.fb.group({
      id: new FormControl({ value: '', disabled: true }),
      checkInDate: ['', [Validators.required, CustomValidators.checkInValidator()]],
      checkOutDate: ['', [Validators.required, CustomValidators.checkOutValidator()]],
      guests: new FormControl({ value: '', disabled: true }),
      roomId: new FormControl({ value: '', disabled: true }),
      userId: new FormControl({ value: '', disabled: true })
    });
  }

  async ngOnInit(): Promise<void> {
    this.reservationId = this.route.snapshot.paramMap.get('id');
    if (this.reservationId) {
      try {
        const reservation = await this.reservationService.getReservation(this.reservationId);
        if (reservation) {
          this.reservation = reservation;
          this.populateForm(reservation); // Populate the form dynamically
        } else {
          console.error('Reserva no encontrada.');
        }
      } catch (error) {
        console.error('Error al cargar la reserva:', error);
      }
    }
  }

  private populateForm(reservation: Reservation): void {
    const formatDate = (date: Date | string | undefined): string => {
      if (!date) {
        return '';
      }
      const parsedDate = typeof date === 'string' ? new Date(date) : date;
      return parsedDate.toISOString().split('T')[0];
    };

    this.editForm.patchValue({
      id: reservation.id,
      checkInDate: formatDate(reservation.checkInDate),
      checkOutDate: formatDate(reservation.checkOutDate),
      guests: reservation.guests,
      roomId: reservation.roomId,
      userId: reservation.userId
    });
  }


  onSubmit(): void {
    if (this.editForm.valid && this.reservationId) {
      const updatedReservation = {
        ...this.editForm.getRawValue(), // Include disabled fields
        id: this.reservationId
      };

      this.reservationDataService.updateReservation(updatedReservation).subscribe(
        () => this.router.navigate(['reservations/list']),
        (error) => console.error('Error al actualizar la reserva: ', error)
      );
    }
  }

  onCancel(): void {
    if (!this.reservationId || isNaN(Number(this.reservationId))) {
      console.error('ID de reserva no válido:', this.reservationId);
      alert('ID de reserva no válido');
      return;
    }

    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      this.reservationService.deleteReservation(this.reservationId)
        .then(() => {
          alert('Reserva cancelada correctamente.');
          this.router.navigate(['/reservations']);
        })
        .catch(error => {
          console.error('Error al cancelar la reserva:', error);
          alert('Hubo un error al cancelar la reserva.');
        });
    }
  }
}
