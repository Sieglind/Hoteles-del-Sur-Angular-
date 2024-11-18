import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Reservation } from '../models/reservation.model';
import { Room } from '../models/room.model';

declare var Email: any;

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private companyMail = 'moraledacd@gmail.com';
  private smtpUsername = 'moraledacd@gmail.com';
  private smtpPassword = 'B50670E945734210A6A99798621CD629E426';

  emailTemplate = `
    <html lang="es">
      <body>
        <h1>Gracias por elegir a Hoteles del Sur. ¡Estamos deseando alojarte!</h1>
        <h2>Estimado/a {{user.name}}:</h2>
        <h3>¡ Nos complace informarte que tu estadia se ha confirmado con el número de Reserva n° {{reservation.id}} !</h3>
        <p strong>Aqui te dejamos los detalles de tu reserva: </p>
        <p>Check-In: {{reservation.checkInDate}}</p>
        <p>Check-Out: {{reservation.checkOutDate}}</p>
        <p>Cantidad de Pasajeros: {{reservation.guests}}</p>
        <p>Tipo de habitación: {{room.type}}</p>
        <p>Total a abonar: {{totalPrice}}</p>
        <p>Politica: </p>
        <p>- Si cancelas la reserva, el cargo por cancelar será el precio de la primera noche.</p>
        <p>- Esta reserva no es reembolsable. No se pueden cambiar las fechas de estancia.</p>
        <p>¿Tienes alguna pregunta o petición especial? Contacta con nosotros.</p>
        <h3>¡Qué empiece la cuenta atrás para tus vacaciones!</h3>
      </body>
    </html>
  `;

  constructor() {}

  sendNotificationMail(user: User, reservation: Reservation, room: Room): void {
    const emailData = {
      To: user.email,
      From: this.companyMail,
      Subject: `Confirmacion de Reserva`,
      Body: this.prepareTemplate(user, reservation, room),
    };

    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: this.smtpUsername,
      Password: this.smtpPassword,
      To: emailData.To,
      From: emailData.From,
      Subject: emailData.Subject,
      Body: emailData.Body,
      Port:2525
    })
      .then((response: any) => {
        console.log('Email sent successfully!', response);
      })
      .catch((error: any) => {
        console.error('Error sending email:', error);
      });
  }

  prepareTemplate(user: User, reservation: Reservation, room: Room): string {
    return this.emailTemplate
      .replace('{{user.name}}', `${user.firstName} ${user.lastName}`)
      .replace('{{reservation.id}}', reservation.id ? reservation.id : '')
      .replace('{{reservation.checkInDate}}', new Date(reservation.checkInDate).toDateString())
      .replace('{{reservation.checkOutDate}}', new Date(reservation.checkOutDate).toDateString())
      .replace('{{reservation.guests}}', reservation.guests.toString())
      .replace('{{room.type}}', room.type)
      .replace('{{totalPrice}}', this.calculateTotal(reservation, room).toString());
  }

  calculateTotal(reservation: Reservation, room: Room): number {
    const timeDifference = (new Date(reservation.checkOutDate).getTime() - new Date(reservation.checkInDate).getTime()) / (1000 * 60 * 60 * 24);
    return room.details.pricePerNight * (timeDifference === 0 ? 1 : timeDifference);
  }
}
