import { NgModule } from "@angular/core";
import { AlertComponent } from "src/app/shared/alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceHolderDivrective } from "./placeholder.directive";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceHolderDivrective,
        DropdownDirective
    ],
    imports:[
        CommonModule
    ],
    exports:[
        
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceHolderDivrective,
        DropdownDirective,
        CommonModule
    ]
})

export class SharedModule{}