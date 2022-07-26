import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Status } from 'src/app/classes/enum/status';
import { Message } from 'src/app/classes/message';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private httpService: HttpService) {
    //init form validation
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.checkPasswords,
      ]),
    });
  }

  checkPasswords(control: FormControl): { [s: string]: boolean } | null {
    let pass = control.parent?.get('password')?.value;
    let passConfirm = control.value;

    if (pass != passConfirm) return { err: true };
    else return null;
  }

  form!: FormGroup;

  message = new Message();

  onSubmit(): void {
    //desctructure and attempt to register

    if (this.form.valid) {
      let { username, password } = this.form.value;
      this.httpService.createUser(username, password).subscribe({
        next: () => {
          this.message.message = 'User created successfully!';
          this.message.status = Status.MESSAGE_SUCCESS;
        },
        error: () => {
          this.message.message = 'User already exists!!';
          this.message.status = Status.MESSAGE_ERROR;
        },
      });
    }
  }
}
