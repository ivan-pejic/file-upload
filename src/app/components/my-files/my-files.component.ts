import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import * as fs from 'file-saver';

import { MyFile } from 'src/app/interfaces/my-file';
import { FileEditComponent } from '../file-edit/file-edit.component';
import { User } from 'src/app/interfaces/user';
import { AuthGuard } from 'src/app/services/auth.guard';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.css'],
})
export class MyFilesComponent implements OnInit, OnDestroy {
  constructor(
    private httpService: HttpService,
    private authGuard: AuthGuard,
    public dialog: MatDialog
  ) {}

  //declarations
  myFiles: MyFile[] = [];
  user!: User;
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    //subscribe to see current users files
    this.subscription.add(
      this.authGuard.userSubject.subscribe((response: User) => {
        this.user = response;
      })
    );
    //refresh file list
    this.getFiles();
  }

  //unsubscribe from subscriptions
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //upload selected files
  uploadFiles(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.files != null) {
      for (let i = 0; i < target.files.length; i++) {
        this.httpService.createFile(target.files[i].name).subscribe(() => {
          //refresh file list
          this.getFiles();
        });
      }
    }
  }

  //delete file from db by id
  deleteFile(id: number): void {
    this.httpService.deleteFileById(id).subscribe(() => {
      //refresh file list
      this.getFiles();
    });
  }

  //download file from db by id
  downloadFile(name: string): void {
    fs.saveAs(new Blob(['This is a mock file']), name + '.txt');
  }

  //edit file
  editFile(file: MyFile): void {
    const dialogRef = this.dialog.open(FileEditComponent, {
      data: file,
    });
    dialogRef.afterClosed().subscribe((file: MyFile | undefined) => {
      if (file != undefined)
        this.httpService.editFileById(file).subscribe(() =>
          //refresh file list
          this.getFiles()
        );
    });
  }

  //get users files
  getFiles(): void {
    this.subscription.add(
      this.httpService.getFilesByUserId().subscribe((response: MyFile[]) => {
        this.myFiles = response;
      })
    );
  }
}
