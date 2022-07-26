import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MyFile } from 'src/app/interfaces/my-file';

@Component({
  selector: 'app-file-edit',
  templateUrl: './file-edit.component.html',
  styleUrls: ['./file-edit.component.css'],
})
export class FileEditComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MyFile,
    public dialogRef: MatDialogRef<FileEditComponent>
  ) {
    this.form = new FormGroup({
      filename: new FormControl('', [Validators.required]),
    });
  }

  //declarations
  tempName!: string;
  form!: FormGroup;

  ngOnInit(): void {
    this.tempName = this.data.name;
  }

  //close dialog
  onNoClick(): void {
    this.dialogRef.close();
  }

  //store data from dialog
  onSubmit(): void {
    this.data.name = this.tempName;
  }
}
