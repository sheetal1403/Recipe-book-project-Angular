import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponse } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent {



    constructor(private authService: AuthService,
                private router: Router) {}
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(authForm: NgForm) {
        // console.log(authForm.value.email);
        let authObs: Observable<AuthResponse>;

        if (this.isLoginMode) {
            this.isLoading = true;
            authObs = this.authService.login(authForm.value.email, authForm.value.password);
        } else {
            console.log('signup');
            this.isLoading = true;
            authObs = this.authService.signup(authForm.value.email, authForm.value.password);
        }

        authObs.subscribe(
            responseData => {
                this.router.navigate(['/recipes']);
                this.isLoading = false;
            },

            errorMsg => {
                console.log(errorMsg);
                this.error = errorMsg;
                this.isLoading = false;
            }
        );

        authForm.reset();
    }

    closeErrorBox() {
        this.error = null;
    }

}
