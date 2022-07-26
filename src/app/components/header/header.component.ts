import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthGuard } from 'src/app/services/auth.guard';
import { User } from 'src/app/interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authGuard: AuthGuard) {}

  //declarations
  user!: User;
  userSub!: Subscription;

  ngOnInit(): void {
    //subscribe to current user details
    this.userSub = this.authGuard.userSubject.subscribe((response: User) => {
      this.user = response;
    });
  }

  //unsubscribe from subscriptions
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  //logout user
  logout(): void {
    this.authGuard.logOut();
  }
}
