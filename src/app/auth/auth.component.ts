import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Observable, Subscription } from 'rxjs';
import { authResponseData } from './auth';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceHolderDivrective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  signinForm! : FormGroup

  isLoggedIn : boolean = true
  isloading: boolean = false
  error: string= ''
  private closeSub : Subscription;
  @ViewChild(PlaceHolderDivrective, {static: false}) alertHost:PlaceHolderDivrective

  constructor(private authService : AuthService, 
              private router : Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.initSignupForm()
  }

  initSignupForm(){
    this.signinForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  onSwitchMode(){
    this.isLoggedIn = !this.isLoggedIn
  }



    
  onAuthenticate(){

    let authObs : Observable<authResponseData>

    this.isloading = true
    if (this.isLoggedIn){
    authObs = this.authService.login(this.signinForm.value)
    }
    else{
    authObs =  this.authService.signup(this.signinForm.value)
     }

    authObs.subscribe((res) =>{
      // console.log(res.idToken)
      this.isloading = false
      this.router.navigate(['/recipes'])

    }, errorMessage=>{
       this.error = errorMessage
      this.showErrorAlert(errorMessage)
      this.isloading = false


    }
    )
   
    this.signinForm.reset()
  }

  onHandleError(){
    this.error = null
  }

  showErrorAlert(error: string){
   const AlertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainer =this.alertHost.viewContainerRef
    hostViewContainer.clear()

   const componentRef = hostViewContainer.createComponent(AlertComponentFactory)

   componentRef.instance.message = error;
  this.closeSub= componentRef.instance.close.subscribe(() =>{
    this.closeSub.unsubscribe()
    hostViewContainer.clear()
   })
  } 
ngOnDestroy(): void {
  if(this.closeSub){
    this.closeSub.unsubscribe()
  }
}
}
