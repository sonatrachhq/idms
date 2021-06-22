import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './../../../Components/error-dialog/error-dialog.component';
import { Languages } from '../../../Models/Languages';
import { RegisterPageService } from '../../../Services/register-page.service';
import { Observable } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';
import { Component, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
})
export class SelectLanguageComponent {
  langs:Languages[]=[];
  constructor(public translate: TranslateService,private registerService: RegisterPageService,public dialog: MatDialog ) {
  
}
ngOnInit(): void {
  //get all languages
  this.registerService.getAllLanguages().subscribe(
    data => {  
      console.log(data);
     this.langs=data;
  },
  error => {
   console.log(error);
   this.openDialogError(error);
   
   
    
  }
  )

}
idmsTranslate(lang:string){
  this.translate.use(lang)
  console.log(lang)
}

openDialogError(error:String): void {
  const dialogRef = this.dialog.open(ErrorDialogComponent, {
    width: '650px',
    data: {message: error}
  });

  dialogRef.afterClosed().subscribe(result => {
    window.location.reload();
  });
}

}
