import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {NgmMasonryModule} from 'ngm-masonry';

import {AppComponent} from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, NgmMasonryModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
