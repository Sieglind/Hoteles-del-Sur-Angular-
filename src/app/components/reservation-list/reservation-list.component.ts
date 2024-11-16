import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit{
  reservations: any[] = [];
  errorMessage: string | null = null;

  constructor(private reservationService: ReservationService){}

  ngOnInit(): void {
    this.loadReservation();
  }

  async loadReservation(): Promise<void>{
    try{
      this.reservations = await this.reservationService.fetchReservations();
    }catch(error){
      this.errorMessage = "Error al cargar las reservas.Intentelo Nuevamente";
      console.error(error);
    }
  }
}
