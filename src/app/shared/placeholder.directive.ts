import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector:'[app-place-holder]'
})
export class PlaceHolderDivrective{ 
    constructor(public viewContainerRef: ViewContainerRef){}
}