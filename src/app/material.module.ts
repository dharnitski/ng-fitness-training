import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';

const types = [MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule];

@NgModule({
    imports: types,
    exports: types
})
export class MaterialModule { }
