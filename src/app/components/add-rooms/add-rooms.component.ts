import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomDataService} from '../../services/room-data.service';
import {CustomValidators} from '../../validators/custom-validators';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-add-rooms',
  templateUrl: './add-rooms.component.html',
  styleUrls: ['./add-rooms.component.css']
})
export class AddRoomsComponent {

  roomForm: FormGroup;
  successMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private roomDataService: RoomDataService,
    private router : Router
  ) {
    this.roomForm = this.fb.group({ 
      id: ['', Validators.required], 
      type: ['', Validators.required], 
      details: this.fb.group({ 
        capacity: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
        pricePerNight: ['', [Validators.required, Validators.min(0)]], 
        available: [true], 
        imageUrl: ['', [Validators.required, CustomValidators.imageUrlValidator()]] 
      }) 
    }); 
  }

  async onSubmit(): Promise<void> { 
    if (this.roomForm.valid) { 
      this.roomDataService.createRoom(this.roomForm.value).subscribe( 
        (createdRoom) => { this.successMessage = true; 
          setTimeout(() => this.successMessage = false, 3000); 
          this.router.navigateByUrl(`/rooms/${createdRoom.id}`); 
        }, (error) => console.error('Error al añadir la habitación:', error) ); 
      } 
  else { console.log('El formulario es inválido'); }
}
}

