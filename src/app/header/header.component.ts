import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  //@Output() selectedOption = new EventEmitter<string>();
  constructor() { }

  //  onSelect(option){
  //      this.selectedOption.emit(option);
  //  }

}
