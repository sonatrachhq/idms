import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/Components/flip-app-card/flip-app-card.component';

@Component({
  selector: 'app-copy-link',
  templateUrl: './copy-link.component.html',
  styleUrls: ['./copy-link.component.css']
})
export class CopyLinkComponent implements OnInit {
  value ='  ';
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.value=data.appUrl;
   }

  ngOnInit(): void {
  }

}
