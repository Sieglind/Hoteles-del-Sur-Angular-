import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation.model';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {
  editForm!: FormGroup;
  reservationId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios en el parámetro de la ruta
    this.route.paramMap.subscribe(params => {
      this.reservationId = params.get('id'); 
    
      this.editForm = this.fb.group({
        checkInDate: ['', Validators.required],
        checkOutDate: ['', Validators.required],
      });

      this.loadReservationData();
    });
  }

  loadReservationData(): void {
    if (this.reservationId) {
      this.reservationService.getReservation(this.reservationId).then(reservation => {
        if (reservation) {
          this.editForm.setValue({
            checkInDate: reservation.checkInDate,
            checkOutDate: reservation.checkOutDate,
          });
        }
      }).catch(error => {
        console.error('Error al cargar la reserva:', error);
      });
    }
  }

  onSave(): void {
    if (this.editForm.valid) {
      const updatedReservation: Partial<Reservation> = {
        checkInDate: this.editForm.value.checkInDate,
        checkOutDate: this.editForm.value.checkOutDate,
      };

      if (!this.reservationId || isNaN(Number(this.reservationId))) {
        console.error('ID de reserva no válido:', this.reservationId);
        alert('ID de reserva no válido');
        return;
      }

      this.reservationService.updateReservation(this.reservationId, updatedReservation)
        .then(() => {
          alert('Reserva actualizada correctamente.');
          this.router.navigate(['/reservations']);
        })
        .catch(error => {
          console.error('Error al actualizar la reserva:', error);
          alert('Hubo un error al actualizar la reserva.');
        });
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
