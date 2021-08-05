import { Role } from './../../Models/Role';
import { RoleSelectComponent } from './../../Modals/role-select/role-select.component';
import { MatDialog } from '@angular/material/dialog';
import { UserAppPrivs } from './../../Models/UserAppPrivs';
import { Component, OnInit, Input } from '@angular/core';
import { CopyLinkComponent } from 'src/app/Modals/copy-link/copy-link.component';

export interface DialogData {
  roles: Role[];
  appUrl:string;
 }
@Component({
  selector: 'app-flip-app-card',
  templateUrl: './flip-app-card.component.html',
  styleUrls: ['./flip-app-card.component.css']
})
export class FlipAppCardComponent implements OnInit {
  flipped=false;
  btn_text:string="";
  
  @Input('app') app:UserAppPrivs;
  @Input('type') type:number;
  constructor(public dialog: MatDialog) {
   
   }

  ngOnInit(): void {
    
    if(this.app.roles.length!=0){
        this.btn_text="access";
    }else{
      this.btn_text="request";
    }
  }

  openRoleSelect() {
    if(this.app.roles.length>1){
      const dialogRef = this.dialog.open(RoleSelectComponent, {
        width: '450px',
        data: {roles:this.app.roles,
        appUrl:this.app.applicationurl.toString() }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        //window.location.reload();
      });
    }else{
      if(this.app.ieflag==1){
        window.open(this.app.applicationurl.toString(), "_blank");
      }else{
        const dialogRef = this.dialog.open(CopyLinkComponent, {
          width: '380px',
          data: {
            appUrl:this.app.applicationurl.toString() }
        });
    
        dialogRef.afterClosed().subscribe(result => {
         // window.location.reload();
        });
      }
     
    }
    
  }

}
