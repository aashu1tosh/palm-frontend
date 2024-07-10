import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    isAuthenticated(): boolean {
        if (typeof window === 'undefined' || !window.sessionStorage) {
            return false;
        }

        const token = sessionStorage.getItem('accessToken');
        return !!token;
    }
}
