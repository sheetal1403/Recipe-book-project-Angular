import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    regitered?: boolean;
}

@Injectable({providedIn: 'root'})

export  class AuthService {

    user = new BehaviorSubject<User>(null);
    private expirationDateTimer: any;

    constructor(private http: HttpClient,
                private router: Router) {}



    signup(email: string, password: string) {

        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
            email,
            password,
            returnSecureToken: true

        }
        ).pipe(catchError(this.handleErrors), tap(responseData => {
            this.handleAuthentication(
                responseData.email,
                responseData.localId,
                responseData.idToken,
                +responseData.expiresIn
            );
        }));
    }

    login(email: string, password: string) {
        // tslint:disable-next-line: max-line-length
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
            email,
            password,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleErrors), tap(responseData => {
            this.handleAuthentication(
                responseData.email,
                responseData.localId,
                responseData.idToken,
                +responseData.expiresIn
            );
        }));
    }

    private handleErrors(errorRes: HttpErrorResponse) {
        let errorMsg = '';
        switch (errorRes.error.error.message) {

            case 'EMAIL_EXISTS':
                errorMsg = 'The email address is already in use by another account';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMsg = 'Password sign-in is disabled for this project.';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMsg = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMsg = 'There is no user record corresponding to this identifier. The user may have been deleted.';
                break;
            case 'INVALID_PASSWORD':
                errorMsg = 'The password is invalid or the user does not have a password.';
                break;
            case 'USER_DISABLED':
                errorMsg = 'The user account has been disabled by an administrator.';
                break;
            default: errorMsg = 'Unknown error';

        }
        return throwError(errorMsg);
    }

    private handleAuthentication(email: string, userID: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000 );
        const user = new User(email, userID, token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.autoLogout(expiresIn * 1000);
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }





    }

    autoLogout(expirationDurationTime: number) {
        this.expirationDateTimer = setTimeout(() => {
            this.logout();
        }, expirationDurationTime);
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
        if (this.expirationDateTimer) {
            clearTimeout(this.expirationDateTimer);
        }

    }

}
