import {Injectable} from '@angular/core';
import {UserDataService} from './user-data.service';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private userDataService: UserDataService, private router: Router) {
  }

  performLogin(email: string, password: string) {
    this.userDataService.getUserByEmail(email).subscribe(
      user => {
        if (user && user[0].password === password) {
          user[0].password = '';
          this.router.navigateByUrl('home').then(() => {
            sessionStorage.setItem('user', JSON.stringify(user[0]));
          });
        } else {
          console.error("Incorrect email or password.");
        }
      },
      error => {
        console.error("User not found or other error:", error);
      }
    );
  }

  userIsLoggedIn(): boolean {
    return sessionStorage.getItem('user') !== null;
  }

  performLogout() {
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('home');
  }
}
