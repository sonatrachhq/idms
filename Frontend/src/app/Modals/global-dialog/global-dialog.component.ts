import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
export interface DialogData {
  title:string;
  message: string;
  
 }
@Component({
  selector: 'app-global-dialog',
  templateUrl: './global-dialog.component.html',
  styleUrls: ['./global-dialog.component.css']
})
export class GlobalDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GlobalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
     
   }

  ngOnInit(): void {
  }
  close(){
    window.location.reload();
  }
}
