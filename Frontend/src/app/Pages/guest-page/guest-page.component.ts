import { GuestPageService } from './../../Services/guest-page.service';
import { HomePageService } from './../../Services/home-page.service';
import { Applications } from './../../Models/Applications';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-page',
  templateUrl: './guest-page.component.html',
  styleUrls: ['./guest-page.component.css']
})
export class GuestPageComponent implements OnInit {
  apps$: Observable<Array<Applications>>=this.guestPageService.getVisibleApps();
  constructor(private guestPageService:GuestPageService) { }

  ngOnInit(): void {
      console.log(this.apps$)
      console.log(new Date)
  }
}
