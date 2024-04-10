import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[DropdownDirective]'
})
export class dropdownDirective{
    @HostBinding('class.open') isOpen=false;
    @HostListener('click') toggle(){
        this.isOpen=!this.isOpen;
    }
}