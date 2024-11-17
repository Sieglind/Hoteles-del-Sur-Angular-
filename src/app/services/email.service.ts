import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {User} from '../models/user.model';
import {Reservation} from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiKey = 'G6FLNNUGQWJ4NT9CVU774FEP'
  private companyMail = 'info@hotelesdelsur.com'



  constructor(
    private userService: UserService) {}

  sendNotificationMail(reservation: Reservation){
    let user : User | null = this.userService.getUserData();
    const template = `
      <html lang="es">
        <body>
          <h1>Confirmación de Reserva</h1>
          <p>Estimado/a,</p>
          <p>Su reserva del <strong>{{checkInDate}}</strong> al <strong>{{checkOutDate}}</strong> se ha realizado con éxito.</p>
          <p>¡Gracias por elegirnos!</p>
        </body>
      </html>
    `;
    if (user) {
      const sendgridClient = require('@sendgrid/mail')
      sendgridClient.setApiKey(this.apiKey);
      const email =  {
        to: user.email,
        from: this.companyMail,
        subject: `Confirmacion de Reserva: ${reservation.checkInDate} a ${reservation.checkOutDate}`,
        text: 'Este mail le llega para ocnfirmar que su reserva se ha realizado con exito',
      }
    }
  }
}
