import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: ` <div class="login-wrapper">
    <mat-tab-group mat-align-tabs="center">
      <mat-tab label="Login">
        <app-login></app-login>
      </mat-tab>
      <mat-tab label="Register">
        <app-register></app-register>
      </mat-tab>
    </mat-tab-group>
  </div>`,
  styles: [
    `
      .login-wrapper {
        max-width: 40rem;
        margin: 5rem auto;
      }

      label {
        margin-left: 1rem;
      }
    `,
  ],
})
export class HomeComponent {
  constructor() {}
}
