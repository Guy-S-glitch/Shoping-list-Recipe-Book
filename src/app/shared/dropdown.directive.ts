import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[DropdownDirective]',
})
export class dropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggle(event: Event) {
    // this.isOpen=!this.isOpen;
    this.isOpen = this.ElRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
    console.log(this.isOpen);
  }
  constructor(private ElRef: ElementRef) {}
}
