import {Component} from '@angular/core';
import {NgmMasonryOptions} from 'ngm-masonry';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent {
    items: string[];
    options: NgmMasonryOptions = {
        transitionDuration: '0',
        itemSelector: '.item',
        columnWidth: '.item',
    };

    constructor() {
        this.items = Array.from({length: 5}, () => 'assets/capitan_cover.jpg');
    }
}
