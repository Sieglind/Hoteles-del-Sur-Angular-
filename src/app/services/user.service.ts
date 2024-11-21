import {Injectable} from '@angular/core';
import {UserDataService} from './user-data.service';
import {Router} from '@angular/router';
import {Role, User} from '../models/user.model';
import {catchError, map, Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userDataService: UserDataService, private router: Router) {
  }

  performLogin(loginForm: { email: string, password: string }): Observable<boolean> {
    return this.userDataService.getUserByEmail(loginForm.email).pipe(
      map(
        users => {
          if(!users){
            throw new Error('Error desconocido al iniciar sesion');
          } else if (users.length == 0 || users[0].email != loginForm.password){
            throw new Error('Credenciales Invalidas');
          }
          users[0].password = '';
          sessionStorage.setItem('user', JSON.stringify(users[0]));
          return true
        })
    )
  }

  register(userForm: any): void {
    this.emailAlreadyExists(userForm.email).subscribe(
      result => {
        if (result) {
          console.log('User already exists');
        } else {
          userForm.role = Role.USER_ROLE;
          this.userDataService.createUser(userForm).subscribe();
        }
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

  getUserId(): string | undefined {
    let currentUser: User = JSON.parse(<string>sessionStorage.getItem('user'));
    return currentUser.id;
  }

  getUserData(): User | null {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  emailAlreadyExists(email: string): Observable<boolean> {
    return this.userDataService.getUserByEmail(email).pipe(
      map(users => users.length > 0),
      catchError(() => of(false))
    )
  }
}
