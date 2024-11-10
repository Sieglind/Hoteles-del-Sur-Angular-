import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';  // Asegúrate de importar Location

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any;

  constructor(private userService: UserService, private location: Location) {}  // Inyección correcta

  ngOnInit(): void {
    if (!this.userService.userIsLoggedIn()) {
      console.log("Usuario no logueado.");
    } else {
      this.userData = this.userService.getUserData();
      console.log("Datos del usuario en el componente de perfil:", this.userData);
    }
  }

  goBack(): void {
    this.location.back(); // Aquí usamos el servicio Location
  }
}