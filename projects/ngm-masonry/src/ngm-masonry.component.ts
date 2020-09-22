import {isPlatformBrowser} from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
    SimpleChanges,
} from '@angular/core';

declare var require: any;
let imagesLoaded: any;
let masonryConstructor: any;

import {INgmMasonryOptions} from './ngm-masonry-options';

@Component({
    selector: '[ngm-masonry], ngm-masonry',
    template: '<ng-content></ng-content>',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgmMasonryComponent implements OnInit, OnChanges, OnDestroy {
    constructor(
        @Inject(PLATFORM_ID) private readonly platformId: any,
        private readonly element: ElementRef,
        private readonly ngZone: NgZone,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) {}

    public _msnry: any;

    // Inputs
    @Input() public options: INgmMasonryOptions = {};
    @Input() public useImagesLoaded: Boolean = false;
    @Input() updateLayout: Boolean = false;

    // Outputs
    @Output() layoutComplete: EventEmitter<any[]> = new EventEmitter<any[]>();
    @Output() removeComplete: EventEmitter<any[]> = new EventEmitter<any[]>();

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            if (this.useImagesLoaded && imagesLoaded === undefined) {
                imagesLoaded = require('imagesloaded');
            }

            if (isPlatformBrowser(this.platformId) && masonryConstructor === undefined) {
                masonryConstructor = require('masonry-layout');
            }

            // Create masonry options object
            if (!this.options) {
                this.options = {};
            }

            // Set default itemSelector
            if (!this.options.itemSelector) {
                this.options.itemSelector = '[ngmMasonryItem], ngmMasonryItem';
            }

            if (isPlatformBrowser(this.platformId)) {
                // Initialize Masonry
                this._msnry = new masonryConstructor(
                    this.element.nativeElement,
                    this.options,
                );

                // Bind to events
                this._msnry.on('layoutComplete', (items: any) => {
                    this.layoutComplete.emit(items);
                    this.changeDetectorRef.markForCheck();
                });
                this._msnry.on('removeComplete', (items: any) => {
                    this.removeComplete.emit(items);
                    this.changeDetectorRef.markForCheck();
                });
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        // only update layout if it's not the first change
        if (changes.updateLayout) {
            if (!changes.updateLayout.firstChange) {
                this.layout();
            }
        }
    }

    ngOnDestroy() {
        if (this._msnry) {
            this._msnry.destroy();
        }
    }

    public layout() {
        setTimeout(() => {
            this._msnry.layout();
            this.changeDetectorRef.markForCheck();
        });
    }

    public reloadItems() {
        setTimeout(() => {
            this._msnry.reloadItems();
            this.changeDetectorRef.markForCheck();
        });
    }

    // public add(element: HTMLElement, prepend: boolean = false) {
    public add(element: HTMLElement) {
        this.ngZone.runOutsideAngular(() => {
            let isFirstItem = false;

            // Check if first item
            if (this._msnry.items.length === 0) {
                isFirstItem = true;
            }

            if (this.useImagesLoaded) {
                imagesLoaded(element, (instance: any) => {
                    this.element.nativeElement.appendChild(element);

                    // Tell Masonry that a child element has been added
                    setTimeout(() => {
                        this._msnry.appended(element);
                    });

                    // layout if first item
                    if (isFirstItem) {
                        this.layout();
                    }
                });

                this.element.nativeElement.removeChild(element);
            } else {
                // Tell Masonry that a child element has been added
                setTimeout(() => {
                    this._msnry.appended(element);
                });

                // layout if first item
                if (isFirstItem) {
                    this.layout();
                }
            }
        });
    }

    public remove(element: HTMLElement) {
        // Tell Masonry that a child element has been removed
        this._msnry.remove(element);

        // Layout items
        this.layout();
    }
}
