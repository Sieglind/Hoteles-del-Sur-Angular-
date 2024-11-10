import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {

    if (!this.userService.userIsLoggedIn()) {
      console.log("Usuario no logueado.");
    } else {
  
      this.userData = this.userService.getUserData();
      console.log("Datos del usuario en el componente de perfil:", this.userData);
    }
  }
}