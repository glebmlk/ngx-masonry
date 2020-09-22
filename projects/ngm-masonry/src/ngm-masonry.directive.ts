import {isPlatformBrowser} from '@angular/common';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    forwardRef,
    Inject,
    OnDestroy,
    PLATFORM_ID,
} from '@angular/core';

import {NgmMasonryComponent} from './ngm-masonry.component';

interface IMutationWindow extends Window {
    MutationObserver: any;
    WebKitMutationObserver: any;
}

declare var window: IMutationWindow;

@Directive({
    selector: '[ngmMasonryItem], ngmMasonryItem',
})
export class NgmMasonryDirective implements OnDestroy, AfterViewInit {
    constructor(
        private _element: ElementRef,
        @Inject(forwardRef(() => NgmMasonryComponent))
        private _parent: NgmMasonryComponent,
        @Inject(PLATFORM_ID) private platformId: any,
    ) {}

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this._parent.add(this._element.nativeElement);
            this.watchForHtmlChanges();
        }
    }

    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            this._parent.remove(this._element.nativeElement);
        }
    }

    /** When HTML in brick changes dinamically, observe that and change layout */
    private watchForHtmlChanges(): void {
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        if (MutationObserver) {
            /** Watch for any changes to subtree */
            const self = this;
            const observer = new MutationObserver(
                (mutations: MutationRecord[], observer: MutationObserver) => {
                    self._parent.layout();
                },
            );

            // define what element should be observed by the observer
            // and what types of mutations trigger the callback
            observer.observe(this._element.nativeElement, {
                subtree: true,
                childList: true,
            });
        }
    }
}
