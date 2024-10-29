import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomAvailabilityService } from '../../services/room-availability.service';
import {Room} from '../../models/room.model';
import {RoomDataService} from '../../services/room-data.service';
import {ReservationService} from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup;
  availableRooms: Room[] = [];

  constructor(private fb: FormBuilder, private roomAvailabilityService: RoomAvailabilityService, private reservationService: ReservationService) {
    this.reservationForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guests: ['', [Validators.required, Validators.min(1)]],
      roomId: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onCheckAvailability(): void {
    const checkInDate = this.reservationForm.get('checkInDate')?.value;
    const checkOutDate = this.reservationForm.get('checkOutDate')?.value;
    const guests = this.reservationForm.get('guests')?.value;

    this.roomAvailabilityService.getRoomAvailability().subscribe(rooms => {
      console.log('Habitaciones obtenidas:', rooms); // Verifica los datos aquí
      this.availableRooms = rooms.filter(room => room.details.capacity >= guests && room.details.available);
      console.log('Habitaciones disponibles:', this.availableRooms); // Verifica el resultado aquí
    });
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      this.reservationService.createReservation(this.reservationForm.value).subscribe()
    } else {
      console.log('Form is invalid');
    }
  }

  selectRoom(roomId: number): void {
    this.reservationForm.patchValue({ roomId });
  }
}
