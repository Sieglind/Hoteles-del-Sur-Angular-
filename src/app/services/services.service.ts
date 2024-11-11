import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = 'http://localhost:3000/services';
  constructor( 
    private http: HttpClient
  ) { }

  async getAllServices(): Promise< Service[] | undefined>{
    return this.http.get<Service[]>(`${this.apiUrl}`).toPromise();
  }

  async addService(newService: Service): Promise<Service | undefined> { 
    return this.http.post<Service>(`${this.apiUrl}`, newService).toPromise();
  }
}
