import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from '../../models/room.model';
import { ReservationService } from '../../services/reservation.service';
import { AvailabilityService } from '../../services/availability.service';
import { Reservation } from '../../models/reservation.model';
import { Router } from '@angular/router';
import { CustomValidators } from '../../validators/custom-validators';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})

export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup;
  rooms: Room[] = [];
  selectedRoom: Room | undefined;
  reservation: Reservation | undefined;
  minDate: string | undefined;
  maxDate: string | undefined;

  constructor(
    private fb: FormBuilder,
    private availabilityService: AvailabilityService,
    private reservationService: ReservationService,
    private router: Router,
  ) {
    this.reservationForm = this.fb.group({
      checkInDate: ['', [Validators.required, CustomValidators.checkInValidator()]],
      checkOutDate: ['', [Validators.required, CustomValidators.checkOutValidator()]],
      guests: [1, [Validators.required, Validators.min(1), Validators.max(4)]],
      roomId: [Validators.required],
    });
  }

  ngOnInit(): void {
    const today = new Date();
    const maxDate = new Date();

    maxDate.setDate(today.getDate() + 60); // Set maxDate to 60 days from today

    this.minDate = this.formatDate(today);
    this.maxDate = this.formatDate(maxDate);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onCheckAvailability() {
    if (this.reservationForm.valid) {
      this.availabilityService.getAvailableRooms(this.reservationForm.value).subscribe(
        rooms => this.rooms = rooms,
        error => console.log(error)
      )
    } else {
      console.log("Form invalido")
    }
  }

  async onSubmit(): Promise<void> {
    if (this.reservationForm.valid && this.selectedRoom) {
      let id: string | undefined = await this.reservationService.createReservation(
        this.reservationForm.value,
        this.selectedRoom
      );
      if (id) {
        await this.router.navigateByUrl(`/reservations/${id}`);
      }
    } else {
      console.log('Form is invalid');
    }
  }

  selectRoom(room: Room): void {
    this.reservationForm.patchValue({ roomId: room.id });
    this.selectedRoom = room;
  }
}
