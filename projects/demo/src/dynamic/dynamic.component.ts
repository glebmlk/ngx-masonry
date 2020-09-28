import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'dynamic',
    template: `
        <div>
            <h3>Dynamic</h3>
            <img #image />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicComponent implements OnInit {
    @ViewChild('image', {static: true, read: ElementRef}) private image:
        | ElementRef<HTMLImageElement>
        | undefined;

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit() {
        setTimeout(() => {
            if (this.image) {
                this.image.nativeElement.src = 'assets/dynamic.jpeg';
                this.changeDetectorRef.markForCheck();
            }
        }, 1000);
    }
}
