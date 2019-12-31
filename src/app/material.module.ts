import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,
    MatCheckboxModule, MatSidenavModule, MatToolbarModule,
    MatListModule, MatTabsModule, MatCardModule,
    MatSelectModule, MatProgressSpinnerModule
} from '@angular/material';

const types = [MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,
    MatCheckboxModule, MatSidenavModule, MatToolbarModule,
    MatListModule, MatTabsModule, MatCardModule,
    MatSelectModule, MatProgressSpinnerModule
];

@NgModule({
    imports: types,
    exports: types
})
export class MaterialModule { }
