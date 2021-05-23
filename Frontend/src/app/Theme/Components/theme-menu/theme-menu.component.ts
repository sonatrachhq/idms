import { ThemeService } from './../../Services/theme.service';
import { Option } from '../../Models/Option';
import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-theme-menu',
  templateUrl: './theme-menu.component.html',
  styleUrls: ['./theme-menu.component.css']
})
export class ThemeMenuComponent implements OnInit {

  @Input() options: Array<Option>=[];
  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private themeService: ThemeService) {}
  ngOnInit(): void {
   
  }

  changeTheme(themeToSet:string) {
    this.themeChange.emit(themeToSet);
  }

}
