import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getCurrentUser() {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
