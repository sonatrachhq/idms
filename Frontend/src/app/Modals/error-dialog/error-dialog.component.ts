import { Router } from '@angular/router';
import { DialogData } from '../alert-dialog/alert-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private router: Router) {
     
   }

  ngOnInit(): void {
  }

  redirectToLogin(){
    this.router.navigateByUrl("login");
  }

}
