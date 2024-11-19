import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {

  }
  getCompanyInfo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}companyInfo`);
  }

  getCompanyContact(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}companyContact`);
  }
}