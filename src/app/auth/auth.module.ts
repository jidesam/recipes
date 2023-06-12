import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../shared/shared.module";
import { CoreModule } from "../core/core.module";

@NgModule({
    declarations:[AuthComponent],
    imports:[
        ReactiveFormsModule,
         CommonModule,
         AuthRoutingModule,
         SharedModule,
         CoreModule
        ]

})

export class AuthModule{}