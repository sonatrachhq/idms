import { HomePageService } from './../../Services/home-page.service';
import { ErrorDialogComponent } from './../error-dialog/error-dialog.component';
import { CommunService } from './../../IdmsServices/commun.service';
import { MailRequest } from './../../Models/MailRequest';
import { AppManagementService } from './../../Services/app-management.service';
import { TokenStorageService } from './../../auth/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2'
export interface DialogData {
 
  app:string,
  obj:string
  
 }
@Component({
  selector: 'app-email-box',
  templateUrl: './email-box.component.html',
  styleUrls: ['./email-box.component.css']
})
export class EmailBoxComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  showSpinner: Boolean = false;

  constructor(private homeService:HomePageService,
    private tokenStorage: TokenStorageService,
    private communService:CommunService,
    private translate: TranslateService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.formGroup = new FormGroup({
      
      emailmsg: new FormControl('', [Validators.required]),
     
    });
   }

  ngOnInit(): void {
  }
  onSubmit(form:any){
    this.showSpinner=true;
    //console.log(form)
    let mailrequest:MailRequest={
      "msg":form.emailmsg.toString(),
      "from":this.tokenStorage.getEmail(),
      "subject":this.data.obj+"-"+this.data.app,
      "to":this.communService.getEmailReceiver()

    }
    //console.log(mailrequest)

    this.homeService.sendEmail(mailrequest).subscribe(
      data => {  
        //console.log(data)
        this.showSpinner=false
        if(data.status){
          this.showAlert("send_email","send_email_success");
        }else{
          Swal.fire({
            icon: 'error',
            title: this.translate.instant("send_email"),
            text: this.translate.instant("send_email_fail"),
            showConfirmButton: false,
          }).then((result) => {
            this.dialog.closeAll()
            Swal.close()
            
            
          })
        }
     },
     error => {
      //console.log(error);
      this.openDialogError("global_error_msg");
      
      
       
     }
    )

  }

    //***************************************************Error handling************************************************** */
    openDialogError(error:String): void {
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        width: '650px',
        data: {message: error}
      });
    
      dialogRef.afterClosed().subscribe(result => {
        window.location.reload();
      });
    }
  
  
    showAlert(title:String,msg:String) {
      Swal.fire({
        icon: 'success',
        title: this.translate.instant(title.toString()),
        text: this.translate.instant(msg.toString()),
        showConfirmButton: false,
      }).then((result) => {
       // window.location.reload();
       this.dialog.closeAll()
      })
   /*    const dialogRef = this.dialog.open(GlobalDialogComponent, {
        width: '350px',
        data: {title:title,message: msg}
      });
    
      dialogRef.afterClosed().subscribe(result => {
        window.location.reload();
      }); */
  }
}
