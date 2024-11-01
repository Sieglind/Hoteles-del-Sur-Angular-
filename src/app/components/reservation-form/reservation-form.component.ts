import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomAvailabilityService } from '../../services/room-availability.service';
import {Room} from '../../models/room.model';
import {RoomDataService} from '../../services/room-data.service';
import {ReservationService} from '../../services/reservation.service';
import {AvailabilityService} from '../../services/availability.service';
import {Reservation} from '../../models/reservation.model';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})

export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup;
  availableRooms: Room[] = [];
  reservation : Reservation | undefined;

  constructor(private fb: FormBuilder, private availabilityService: AvailabilityService, private reservationService: ReservationService) {
    this.reservationForm = this.fb.group({
      checkInDate: [Validators.required],
      checkOutDate: [Validators.required],
      guests: [[Validators.required, Validators.min(1)]],
      roomId: [Validators.required]
    });
  }

  ngOnInit(): void {}

  async onCheckAvailability(): Promise<void> {
    const checkInDate = this.reservationForm.get('checkInDate')?.value;
    const checkOutDate = this.reservationForm.get('checkOutDate')?.value;
    const guests = this.reservationForm.get('guests')?.value;

    if (checkInDate && checkOutDate && guests){
      this.reservation = new Reservation(checkInDate,checkOutDate,guests);
      this.availableRooms = await this.availabilityService.getAvailableRooms(this.reservation);
    } else {
      console.log("Form invalido")
    }
  }

  onSubmit(): void {
    if (this.reservationForm.valid && this.reservation) {
      this.reservationService.createReservation(this.reservation).subscribe()
    } else {
      console.log('Form is invalid');
    }
  }

  selectRoom(roomId: string): void {
    if (this.reservation) this.reservation.roomId = roomId;
  }
}
