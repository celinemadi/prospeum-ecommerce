import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {ProgressBarModule} from 'primeng/progressbar';
import { ProgressBarComponent } from './progress-bar.component';

@NgModule({
    declarations: [
        ProgressBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,
        ProgressBarModule
    ],
    exports     : [
        ProgressBarComponent
    ]
})
export class ProgressModule
{
}
