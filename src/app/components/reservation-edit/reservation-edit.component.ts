import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reservation } from '../../models/reservation.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrl: './reservation-edit.component.css'
})
export class ReservationEditComponent implements OnInit{
  @Input() reservation! : Reservation;
  @Output() reservationUpdated = new EventEmitter<void>();
  editForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private reservationService: ReservationService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
      this.editForm = this.fb.group({
        checkInDate: [this.reservation.checkInDate, Validators.required],
        checkOutDate: [this.reservation.checkOutDate,Validators.required]
      });
  }

  async onSave(): Promise<void>{
    if(this.editForm.invalid){
      this.errorMessage= 'Por favor, ingrese Fechas validas';
      return;
    }
    try{
      const updateReservation ={
        ...this.reservation,
        checkInDate: this.editForm.value.checkInDate,
        checkOutDate: this.editForm.value.checkOutDate
      };

      await this.reservationService.updateReservation(updateReservation);
      this.reservationUpdated.emit();
    }catch(error){
      this.errorMessage = 'No se pudo actualizar la reserva. Intenta nuevamente';
      console.error(error);
    }
  }

  async onCancel(): Promise<void>{
    if (!this.reservation.id) {
      this.errorMessage = 'El ID de la reserva no está definido.';
      return;
    }
    try{
      await this.reservationService.deleteReservation(this.reservation.id);
      this.reservationUpdated.emit();
    }catch(error){
      this.errorMessage = 'No se pudo Cancelar la reserva. Intente Nuevamente';
      console.error(error);
    }
  }

}
