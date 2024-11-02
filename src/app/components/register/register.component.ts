import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerSuccess = false;
  registerError = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      let nombre = this.registerForm.get('firstName')?.value;
      let apellido = this.registerForm.get('lastName')?.value;
      let email = this.registerForm.get('email')?.value;
      let telefono = this.registerForm.get('phoneNumber')?.value;
      let pass = this.registerForm.get('password')?.value;

      try {
        if (nombre && apellido && email && telefono && pass) {
          let user: User = new User(nombre, apellido, email, telefono, pass);
          this.userService.register(user);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
