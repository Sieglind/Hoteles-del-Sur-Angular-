import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.userService.performLogin(this.loginForm.value).subscribe(
      result => {
        if (result) this.router.navigate(['/']);
      },
      error => {
        this.openConfirmDialog(error.message);
      }
    );
  }

  openConfirmDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      height: '200px',
      data: errorMessage
    });
  }
}
