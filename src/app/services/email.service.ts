import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiKey = 'G6FLNNUGQWJ4NT9CVU774FEP'
  private companyMail = 'info@hotelesdelsur.com'



  constructor(
    private userService: UserService) { }

  sendNotificationMail(reservation: Reservation) {
    let user: User | null = this.userService.getUserData();
    const template = `
     <html>
<body>
<h1>Gracias por elegir a Hoteles del Sur. ¡Estamos deseando alojarte!</h1>
<h2>Estimado/a {{user.nombre}}:</h2>
<h3>¡ Nos complace informarte que tu estadia se ha confirmado con el número de Reserva n° {{resevation.id}} !</h3>
<p strong>Aqui te dejamos los detalles de tu reserva: </p>
<p>Check-In: {{reservation.checkInDate}}</p>
<p>Check-Out: {{reservation.checkOutDate}}</p>
<p>Cantidad de Pasajeros: {{reservation.guests}}</p>
<p>Tipo de habitación: {{}}</p>
<p>Total a abonar: {{}}</p>
<p>Politica: </p>
<p>- Si cancelas la reserva, el cargo por cancelar será el precio de la primera noche.</p> 
<p>- Esta reserva no es reembolsable. No se pueden cambiar las fechas de estancia.</p>
<p>¿Tienes alguna pregunta o petición especial? Contacta con nosotros.</p>
<h3>¡Qué empiece la cuenta atrás para tus vacaciones!</h3>


</body>
</html>

    `;
    if (user) {
      const sendgridClient = require('@sendgrid/mail')
      sendgridClient.setApiKey(this.apiKey);
      const email = {
        to: user.email,
        from: this.companyMail,
        subject: `Confirmacion de Reserva: ${reservation.checkInDate} a ${reservation.checkOutDate}`,
        html: '',
      }
    }
  }
}
