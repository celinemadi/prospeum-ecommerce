import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProgressBarService } from './progress-bar.service';

@Component({
    selector     : 'progress-bar',
    templateUrl  : './progress-bar.component.html',
    styleUrls    : ['./progress-bar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProgressBarComponent implements OnInit, OnDestroy
{
    bufferValue: number;
    mode: 'indeterminate';
    value: number;
    visible: boolean;

    private _unsubscribeAll: Subject<any>;

    
    constructor(
        private _ProgressBarService: ProgressBarService
    )
    {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        
        this._ProgressBarService.bufferValue
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((bufferValue) => {
                this.bufferValue = bufferValue;
            });

        // Mode
        this._ProgressBarService.mode
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((mode) => {
                this.mode = mode;
            });

        // Value
        this._ProgressBarService.value
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) => {
                this.value = value;
            });

        // Visible
        this._ProgressBarService.visible
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((visible) => {
                this.visible = visible;
            });

    }

  
    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

   

}
