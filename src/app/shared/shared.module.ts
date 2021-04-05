import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AlertModule} from '../../../projects/ff-alerts/src/lib/alert.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  exports: [
    CommonModule,
    AlertModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
