import {Component} from '@angular/core';
import {INgmMasonryOptions} from 'ngm-masonry';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent {
    items: Array<{isDynamic: boolean; src: string}>;
    options: INgmMasonryOptions = {
        transitionDuration: '0',
        itemSelector: '.item',
        columnWidth: '.item',
    };

    constructor() {
        this.items = Array.from({length: 50}, (value: any, index: number) => ({
            isDynamic: index % 2 === 0,
            src: 'assets/static.jpg',
        }));
    }
}
