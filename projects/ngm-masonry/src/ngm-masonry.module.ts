import {NgModule} from '@angular/core';
import {NgmMasonryComponent} from './ngm-masonry.component';
import {NgmMasonryDirective} from './ngm-masonry.directive';

@NgModule({
    imports: [],
    declarations: [NgmMasonryComponent, NgmMasonryDirective],
    exports: [NgmMasonryComponent, NgmMasonryDirective],
})
export class NgmMasonryModule {}
