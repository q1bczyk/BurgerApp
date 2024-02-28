import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { LocalInterface } from "src/app/shared/models/local.interface";
import { BaseApiService } from "src/app/shared/services/base-api.service";
import { AdminContactInterface } from "../models/admin-contact.interface";

@Injectable({
    providedIn: 'root'
})

export class AdminService extends BaseApiService
{
    url : string = this.baseUrl + 'admin';

    constructor(protected override http: HttpClient, private router: Router) 
    {
        super(http);
    }

    login(data : {email : string, password : string}) : Observable<any>
    {
        return this.http.post<any>(this.url + '/login', data)
            .pipe(
                map(resData => {
                    return resData;
                })
            );
    }

    getLocalData() : Observable<LocalInterface>
    {
        return this.http.get<LocalInterface>(this.url + '/local', {headers : this.setHeaders()})
            .pipe(
                map(res => {
                    return res;
                })
            )
    }

    getAdminContact() : Observable<AdminContactInterface>
    {
        return this.http.get<AdminContactInterface>(this.url + '/contact', { headers : this.setHeaders()})
            .pipe(
                map(res => {
                    return res;
                })
            )
    }

    editData(data : AdminContactInterface) : Observable<AdminContactInterface>
    {
        return this.http.put<AdminContactInterface>(this.url + '/contact', data, { headers : this.setHeaders()})
            .pipe(
                map(res => {
                    return res;
                })
            )
    }

    logOut() : void
    {
        localStorage.removeItem('token');
    }
}