// data.service.ts
import { Injectable } from '@angular/core';
import axios from '../../services/instance';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    fetchData() {
        return axios.get(`/admin`);
    }

    deleteUser(id: string) {
        return axios.delete(`/admin/${id}`);
    }

    updateUserPassword(id: string, result: any) {
        throw new Error('Method not implemented.');
    }
}
