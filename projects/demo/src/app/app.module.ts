import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {NgmMasonryModule} from 'ngm-masonry';
import {DynamicComponent} from '../dynamic/dynamic.component';

import {AppComponent} from './app.component';

@NgModule({
    declarations: [AppComponent, DynamicComponent],
    imports: [BrowserModule, NgmMasonryModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
