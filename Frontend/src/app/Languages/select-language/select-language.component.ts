import { Directionality } from '@angular/cdk/bidi';
import { Component, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
})
export class SelectLanguageComponent {
 
  constructor(public translate: TranslateService) {
  
}
ngOnInit(): void {
 

}


}
