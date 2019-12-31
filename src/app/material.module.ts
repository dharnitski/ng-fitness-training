import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,
    MatCheckboxModule, MatSidenavModule, MatToolbarModule,
    MatListModule
} from '@angular/material';

const types = [MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,
    MatCheckboxModule, MatSidenavModule, MatToolbarModule,
    MatListModule
];

@NgModule({
    imports: types,
    exports: types
})
export class MaterialModule { }
