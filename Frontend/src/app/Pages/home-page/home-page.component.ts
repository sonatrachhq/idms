import { TokenStorageService } from './../../auth/token-storage.service';
import { Observable } from 'rxjs';
import { Applications } from './../../Models/Applications';
import { HomePageService } from './../../Services/home-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
 
  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  
   
  }

}
