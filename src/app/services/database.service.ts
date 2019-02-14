import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage) {
   
  }

  saveUserDetails(){

  }

  getUserDetails(){
      
  }
}
