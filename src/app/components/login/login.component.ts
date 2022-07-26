import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Status } from 'src/app/classes/enum/status';
import { Message } from 'src/app/classes/message';
import { User } from 'src/app/interfaces/user';
import { AuthGuard } from 'src/app/services/auth.guard';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private httpService: HttpService, private authGuard: AuthGuard) {
    //init form validation
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  //declarations
  form!: FormGroup;
  message = new Message();

  onSubmit(): void {
    //desctructure and attempt to login
    if (this.form.valid) {
      let { username, password } = this.form.value;

      this.httpService.getUserByNameAndPassword(username, password).subscribe({
        next: (response: User[]) => {
          let [user] = response;
          this.authGuard.logIn(user);
          //this.authGuard.logIn(response[0]);
        },
        error: () => {
          this.message.message = 'Name or password incorrect!';
          this.message.status = Status.MESSAGE_ERROR;
        },
      });
    }
  }
}
