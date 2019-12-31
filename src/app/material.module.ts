import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule } from '@angular/material';

const types = [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule];

@NgModule({
    imports: types,
    exports: types
})
export class MaterialModule { }
