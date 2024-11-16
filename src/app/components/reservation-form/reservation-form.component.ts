import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Room} from '../../models/room.model';
import {ReservationService} from '../../services/reservation.service';
import {AvailabilityService} from '../../services/availability.service';
import {Reservation} from '../../models/reservation.model';
import {Router} from '@angular/router';
import {CustomValidators} from '../../validators/custom-validators';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})

export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup;
  rooms: Room[] = [];
  reservation : Reservation | undefined;

  constructor(
    private fb: FormBuilder,
    private availabilityService: AvailabilityService,
    private reservationService: ReservationService,
    private router : Router,
  ) {
    this.reservationForm = this.fb.group({
      checkInDate: ['',[Validators.required,CustomValidators.checkInValidator()]],
      checkOutDate: ['',[Validators.required,CustomValidators.checkOutValidator()]],
      guests: [1,[Validators.required, Validators.min(1),Validators.max(4)]],
      roomId: [Validators.required],
    });
  }

  ngOnInit(): void {}

  onCheckAvailability() {
    if (this.reservationForm.valid){
      this.availabilityService.getAvailableRooms(this.reservationForm.value).subscribe(
        rooms => this.rooms = rooms,
        error => console.log(error)
      )
    } else {
      console.log("Form invalido")
    }
  }

  async onSubmit(): Promise<void> {
    if (this.reservationForm.valid) {
      let id: string | undefined = await this.reservationService.createReservation(this.reservationForm.value);
      if (id) {
        await this.router.navigateByUrl(`/reservations/${id}`);
      }
    } else {
      console.log('Form is invalid');
    }
  }

  selectRoom(roomId: string): void {
    this.reservationForm.patchValue({roomId: roomId});
  }
}
