import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseUrl {
  public baseUrl : string = environment.apiBaseUrl
  public authURL: string = environment.authURL
  public loginURL : string = environment.loginURL

  constructor() { }

 
}
