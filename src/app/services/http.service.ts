import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MyFile } from 'src/app/interfaces/my-file';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  //api path
  api: string = 'http://localhost:3000';

  //user id
  private userId: number = 0;

  //get users files by id
  public getFilesByUserId(): Observable<MyFile[]> {
    return this.http.get<MyFile[]>(
      `${this.api}/files/byUserId/?id=${this.userId}`
    );
  }

  //upload selected file to database
  public createFile(fileName: string): Observable<MyFile> {
    return this.http.post<MyFile>(`${this.api}/files/`, {
      userId: this.userId,
      name: fileName,
    });
  }

  //edit file on database by id
  public editFileById(file: MyFile): Observable<void> {
    return this.http.put<void>(`${this.api}/files/`, {
      id: file.id,
      name: file.name,
    });
  }

  //delete file from database by id
  public deleteFileById(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.api}/files/byUserId/?id=${id}&userId=${this.userId}`
    );
  }

  //download file from database by id
  public downloadFileById(id: number): Observable<void> {
    return this.http.get<void>(
      `${this.api}/files/download/?id=${id}&userId=${this.userId}`
    );
  }

  //@TODO make user sessions on database and login with post
  //get user via name and pass -> log in
  public getUserByNameAndPassword(
    name: string,
    password: string
  ): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.api}/users/login/?name=${name}&password=${password}`
    );
  }

  //create new user
  public createUser(name: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.api}/users/`, {
      name: name,
      password: password,
    });
  }

  //edit user on database by id
  public editUserById(
    oldPassword: string,
    newPassword: string
  ): Observable<void> {
    return this.http.put<void>(`${this.api}/users/`, {
      newPassword: newPassword,
      id: this.userId,
      oldPassword: oldPassword,
    });
  }

  //set user id value
  public setUserId(userId: number): void {
    this.userId = userId;
  }
}
