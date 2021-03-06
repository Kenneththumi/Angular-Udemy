import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
        isLoginMode = true;

        switchLoginMode(){
            this.isLoginMode = !this.isLoginMode;
        }

        constructor() { }

        ngOnInit(): void {
        }

        onSubmit(form:NgForm){
            console.log(form.value)
        }

}
