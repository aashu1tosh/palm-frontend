import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    isAuthenticated(): boolean {
        if (typeof window === 'undefined' || !window.localStorage) {
            return false;
        }

        const token = localStorage.getItem('accessToken');
        return !!token;
    }
}
