import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared/shared.module";

const routes:Routes =[
    {path:'', component: AuthComponent}
]


@NgModule({
   imports:[SharedModule,
    RouterModule.forChild(routes)
],
    exports:[]
})

export class AuthRoutingModule{}