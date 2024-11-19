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
  editForm!: FormGroup;
  reservationId: string | null = null;
  roomId: string | undefined;
  userId: string | undefined;
  reservation: Reservation | undefined;
  reservations: any[] = [];
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private reservationDataService: ReservationDataService

    
  ) {
      this.editForm = this.fb.group({
      id:new FormControl(this.reservationId),
      checkInDate: ['', [Validators.required, CustomValidators.checkInValidator()]],
      checkOutDate: ['', [Validators.required, CustomValidators.checkOutValidator()]],
      guests: ['',[Validators.required, Validators.min(1), Validators.max(4)]],
      roomId: new FormControl(this.roomId),
      userId: new FormControl(this.userId)
  });
}

async ngOnInit(): Promise<void> {
  this.reservationId = this.route.snapshot.paramMap.get('id');
  if (this.reservationId) {
    try {
      const reservation = await this.reservationService.getReservation(this.reservationId);
      if (reservation) {
        console.log(reservation);
        this.roomId = reservation.roomId;
        this.userId = reservation.userId;
      } else {
        console.error('Reserva no encontrada.');
      }
    } catch (error) {
      console.error('Error al cargar la reserva:', error);
    }
  }
}

  onSubmit():void{
    if(this.editForm.valid && this.reservationId){
      console.log(this.editForm.value);
      const reservationData = {...this.editForm.value, id:this.reservationId};
      console.log(reservationData);
      this.reservationDataService.updateReservation(reservationData).subscribe(
        ()=> this.router.navigate(['reservations/list']),
        (error)=> console.error('Error al actualizar la reserva: ',error)
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
