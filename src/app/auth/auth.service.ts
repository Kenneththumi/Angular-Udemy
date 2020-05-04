import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
}

@Injectable({providedIn:'root'})
export class AuthService{
     
    constructor(private http: HttpClient){}

    signup(eml:string, pwd:string){
        this.http.
               post<AuthResponseData>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[]',
                    {
                        password:pwd,
                        email:eml
                    }
                )
    }
}
