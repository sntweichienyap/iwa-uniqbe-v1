import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const EMAIL = 'email';
const PASSWORD = "password";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage) {
   
  }

  async saveUserDetails(email: string){
    return this.storage.set(EMAIL, email).then(() => {
      
    });
  }

  getUserDetails(): string{
    // this.storage.get(EMAIL).then(res => {
    //   return 
    // })
    return "success";
  }
}
