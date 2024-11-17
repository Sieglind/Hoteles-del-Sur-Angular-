import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reservation } from '../../models/reservation.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {
  @Input() reservation!: Reservation;
  @Output() reservationUpdated = new EventEmitter<void>();
  editForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      checkInDate: [this.reservation.checkInDate, Validators.required],
      checkOutDate: [this.reservation.checkOutDate, Validators.required]
    });

    const reservationId = this.route.snapshot.paramMap.get('id');
    if (reservationId) {
      this.loadReservationDetails(reservationId); 
    }
  }
  async loadReservationDetails(reservationId: string): Promise<void> {
    try {
      const reservation = await this.getReservation(reservationId);
  
      if (!reservation) {
        this.errorMessage = 'Reserva no encontrada';
        return;
      }
  
      this.reservation = reservation;
    } catch (error) {
      this.errorMessage = 'Hubo un problema al cargar los detalles de la reserva';
      console.error(error);
    }
  }
  

  async onSave(): Promise<void> {
    if (this.editForm.invalid) {
      this.errorMessage = 'Por favor, ingrese fechas válidas';
      return;
    }

    try {
      const updatedReservation = {
        ...this.reservation,
        checkInDate: this.editForm.value.checkInDate,
        checkOutDate: this.editForm.value.checkOutDate
      };

      await this.reservationService.updateReservation(updatedReservation);
      this.reservationUpdated.emit();
    } catch (error) {
      this.errorMessage = 'No se pudo actualizar la reserva. Intenta nuevamente';
      console.error(error);
    }
  }

  async onCancel(): Promise<void> {
    if (!this.reservation.id) {
      this.errorMessage = 'El ID de la reserva no está definido.';
      return;
    }

    try {
      await this.reservationService.deleteReservation(this.reservation.id);
      this.reservationUpdated.emit();
    } catch (error) {
      this.errorMessage = 'No se pudo cancelar la reserva. Intente nuevamente';
      console.error(error);
    }
  }
  async getReservation(reservationId: string): Promise<Reservation | undefined> {
    try {
      const reservation = await this.reservationService.getReservation(reservationId);
      if (!reservation) {
        console.warn('Reserva no encontrada');
        return undefined;
      }
      return reservation;
    } catch (error) {
      console.error('Error al obtener la reserva:', error);
      return undefined;
    }
  }
}

