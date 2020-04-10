import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggle]'
})
export class ToggleDirective {
  @HostBinding('class.open') isOpen = false;  //binding host element

  @HostListener('click') toggleOpen() { //listens to host element events
    this.isOpen = !this.isOpen;
  }
}
