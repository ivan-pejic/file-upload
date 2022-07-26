import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { User } from '../interfaces/user';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private httpService: HttpService, private router: Router) {}

  //current user details
  public userSubject = new BehaviorSubject<User>({ name: '', id: 0 });
  user!: User;

  //check if user can access path
  canActivate(): boolean {
    return this.isLoggedIn();
  }

  //@TODO make proper authguard via JWT
  public logIn(user: User): void {
    this.user = user;
    this.userSubject.next(user);
    this.httpService.setUserId(user.id);
    //add cookie
    localStorage.setItem('token', user.id.toString());
    this.router.navigate(['my-files']);
  }

  //logout current user
  public logOut(): void {
    //remove cookie
    localStorage.removeItem('token');
    this.userSubject.next({ name: '', id: 0 });
  }

  //check if user is logged in
  public isLoggedIn(): boolean {
    if (this.user == undefined) return false;
    return localStorage.getItem('token') == this.user.id.toString();
  }
}
