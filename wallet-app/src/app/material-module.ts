import {NgModule} from '@angular/core';
import {MatFormFieldModule, 
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatInputModule,
} from "@angular/material";

@NgModule({
    exports: [
        MatFormFieldModule, 
        MatSelectModule,
        MatOptionModule,
        MatRadioModule,
        MatInputModule,

    ]
})

export class DemoMaterialModule {}