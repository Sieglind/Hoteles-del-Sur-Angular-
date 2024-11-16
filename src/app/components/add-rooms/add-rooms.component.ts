import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../validators/custom-validators';
import {RoomService} from '../../services/room.service';


@Component({
  selector: 'app-add-rooms',
  templateUrl: './add-rooms.component.html',
  styleUrls: ['./add-rooms.component.css']
})
export class AddRoomsComponent {

  roomForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
  ) {
    this.roomForm = this.fb.group({
      roomNumber: ['', Validators.required, CustomValidators.roomExists(this.roomService)],
      type: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
      pricePerNight: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required, CustomValidators.imageUrlValidator()]]
    });
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      this.roomService.createRoom(this.roomForm.value).subscribe(
        room => room ? console.log("success") : console.log("error"),
        error => console.error('Error al añadir la habitación:', error)
      );
    } else {
      console.log('El formulario es inválido');
    }
  }
}

