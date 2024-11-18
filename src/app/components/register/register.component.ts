import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {CustomValidators} from '../../validators/custom-validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerSuccess = false;
  registerError = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email], CustomValidators.emailAlreadyExists(userService)],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      try {
        this.userService.register(this.registerForm.value);
        this.router.navigate(['login']);
      } catch (error) {
        this.registerError = true;
      }
    }
  }
}
