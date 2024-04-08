import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class headerComponent {
    @Output() GetPage = new EventEmitter<string>();
    onSelect(selection: string) {
        this.GetPage.emit(selection);
    }
}
