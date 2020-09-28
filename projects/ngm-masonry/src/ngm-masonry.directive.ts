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
    private _observer: MutationObserver;

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

            if (!!this._observer) {
                this._observer.disconnect();
            }
        }
    }

    /** When HTML in brick changes dynamically, observe that and change layout */
    private watchForHtmlChanges(): void {
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        if (MutationObserver) {
            this._observer = new MutationObserver(() => {
                requestAnimationFrame(() => {
                    this._parent.layout();
                });
            });
        }

        if (!!this._observer) {
            // define what element should be observed by the observer
            // and what types of mutations trigger the callback
            this._observer.observe(this._element.nativeElement, {
                subtree: true,
                childList: true,
                attributes: true,
                attributeFilter: ['src'],
            });
        }
    }
}
