
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from 'src/app/Components/flip-app-card/flip-app-card.component';
import { CookieService } from 'ngx-cookie-service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.css']
})
export class RoleSelectComponent implements OnInit {
  selected :number=-1;
  constructor(public dialogRef: MatDialogRef<RoleSelectComponent>,private cookieService: CookieService,private tokenStorage:TokenStorageService ,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
     
   }

  ngOnInit(): void {
    //console.log(this.data.roles[0].descrole)
  }


  accessApp(){
    console.log(this.data.roles[this.selected].idrole  )
    if(this.selected!=-1){
      this.cookieService.set( 'sonUser', this.tokenStorage.getSonuser());
      this.cookieService.set( 'roleid', this.data.roles[this.selected].idrole.toString());
      this.cookieService.set( 'token', this.tokenStorage.getToken());
      this.cookieService.set('userId',this.tokenStorage.getUserId());
      this.cookieService.set('username',this.tokenStorage.getUsername())
      window.open(this.data.appUrl, "_Blank");
    
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
   
   // //console.log(this.selected)
  }
 
}
