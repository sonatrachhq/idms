
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from 'src/app/Components/flip-app-card/flip-app-card.component';

@Component({
  selector: 'app-role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.css']
})
export class RoleSelectComponent implements OnInit {
  selected :number=-1;
  constructor(public dialogRef: MatDialogRef<RoleSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
     
   }

  ngOnInit(): void {
    console.log(this.data.roles[0].descrole)
  }


  accessApp(){
    console.log(this.selected)
    if(this.selected!=-1){
      window.open(this.data.appUrl, "_blank");
      this.onNoClick();
    }
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  updateData(i:number){
    if(this.selected!=i){
      this.selected=i
    }else{
      this.selected=-1
    }
   
   // console.log(this.selected)
  }
 
}
