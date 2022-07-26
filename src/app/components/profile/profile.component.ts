import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Status } from 'src/app/classes/enum/status';
import { Message } from 'src/app/classes/message';
import { User } from 'src/app/interfaces/user';
import { AuthGuard } from 'src/app/services/auth.guard';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('formDirective') private formDirective!: NgForm;
  constructor(private authGuard: AuthGuard, private httpService: HttpService) {
    this.form = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
    });
  }

  //declarations
  form!: FormGroup;
  message = new Message();
  user!: User;
  subscription!: Subscription;
  isHidden: boolean = true;
  userImage: string = this.getUserImage();

  ngOnInit(): void {
    //subscribe to current user details
    this.subscription = this.authGuard.userSubject.subscribe(
      (response: User) => {
        this.user = response;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changePassword(): void {
    this.formDirective.resetForm();
    this.message.status = Status.MESSAGE_NOSTATE;
    this.isHidden = !this.isHidden;
  }

  onSubmit(): void {
    //desctructure and attempt to login
    if (this.form.valid) {
      let { oldPassword, newPassword } = this.form.value;

      if (oldPassword != newPassword) {
        this.httpService.editUserById(oldPassword, newPassword).subscribe({
          next: (response) => {
            if (response == null) {
              this.message.message = 'Wrong password entered!';
              this.message.status = Status.MESSAGE_ERROR;
            } else {
              this.message.message = 'Password changed successfully!';
              this.message.status = Status.MESSAGE_SUCCESS;
            }

            //this.authGuard.logIn(response[0]);
          },
        });
      } else {
        this.message.message = 'Passwords are the same!';
        this.message.status = Status.MESSAGE_ERROR;
      }
    }
  }

  //temporary links for user profile image
  getUserImage(): string {
    let tmpUserIcons: string[] = [
      'https://cdn-icons-png.flaticon.com/512/147/147142.png',
      'https://cdn-icons-png.flaticon.com/512/147/147144.png',
      'https://cdn-icons-png.flaticon.com/512/194/194938.png',
    ];
    return tmpUserIcons[Math.floor(Math.random() * 3)];
  }
}
