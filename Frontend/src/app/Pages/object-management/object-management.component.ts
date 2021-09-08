import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from './../../auth/token-storage.service';
import { UsersObject } from './../../Models/UsersObject';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-object-management',
  templateUrl: './object-management.component.html',
  styleUrls: ['./object-management.component.css']
})
export class ObjectManagementComponent implements OnInit {

  allObjects:UsersObject[]=[];
  mode:number;
  constructor(private tokenStorage: TokenStorageService,private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
   this.allObjects=this.tokenStorage.getObjects();
   ////console.log(this.allObjects)
   this.route.queryParams.subscribe(Params=>{this.mode=Params["mode"];
   console.log(Params["mode"])})
  }

 
  getPrivs(id:number):Boolean{
 
    if(this.allObjects.length!=0){
      for(let i=0;i<this.allObjects.length;i++){
        if(this.allObjects[i].idapplication==1){
            for(let j=0;j<this.allObjects[i].objects.length;j++){
              if(this.allObjects[i].objects[j].idobject==id){
                return true;
              }
            }
         
        }
      }
      return false;
    }else{
      return false;
    }

 
  }

}
