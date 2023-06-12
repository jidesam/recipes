import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../shared/base-url.service';
import { Auth, IAuthUser, authResponseData } from '../auth/auth';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../auth/iuser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseUrl {

  user = new BehaviorSubject<User>(null)
  token : null
  tokenExpirationTimer : any
  constructor(private http: HttpClient,
              private router : Router) {
    super()
  }

  signup(payload: Auth) {
    return this.http.post<authResponseData>(`${this.authURL}`,
      {
        ...payload,
        returnSecureToken: true
      })
        .pipe(catchError(this.handleError),
        tap(resData => {
        
            this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        })
      )
  }

  login(payload: Auth) {
    return this.http.post<authResponseData>(`${this.loginURL}`,
      {
        ...payload,
        returnSecureToken: true
      }
    )
      .pipe(catchError(this.handleError),
      
      tap(resData => {
        this.handleAuth(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        )
      }
      ))
  }

  logout(){
    this.user.next(null)
    this.router.navigateByUrl('/auth')
    localStorage.removeItem('userData')
    // logout to clear the expiration time
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
    
  }

  handleAuth(
    email: string,
    userID: string,
    token: string,
    expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(email, userID, token, expirationDate);
    this.user.next(user)
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
    

  }

  autoLogin(){
    
  const userData: {
    email: string,
    password: string,
    _token : string,
    _tokenExpirationDate : string
  } = 
  JSON.parse(localStorage.getItem('userData'))
  if(!userData){
    return
  }else{
    const loadedUser = new User(userData.email, userData.password, userData._token, new Date(userData._tokenExpirationDate))
    if(loadedUser.token){

      this.user.next(loadedUser)
      // calculate the remaining time left 
      const expirationduration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationduration)
    }
  }
 
  }

  autoLogout(expirationDuration: number){
   this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration);
  }

  handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'an unknown error occured!'

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXIST':
        errorMessage = 'this email already exist'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password'
    }

    return throwError(errorMessage)
  }
}
