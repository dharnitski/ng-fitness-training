import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,
    MatCheckboxModule, MatSidenavModule
} from '@angular/material';

const types = [MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,
    MatCheckboxModule, MatSidenavModule
];

@NgModule({
    imports: types,
    exports: types
})
export class MaterialModule { }
