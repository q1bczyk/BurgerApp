import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { LocalInterface } from "src/app/shared/models/local.interface";

@Injectable({
    providedIn: 'root'
})

export class AdminService
{
    url : string = "https://localhost:5001/api/admin";

    constructor(private http : HttpClient, private router : Router){}

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
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
        });

        return this.http.get<LocalInterface>(this.url + '/local', {headers : headers})
            .pipe(
                map(res => {
                    return res;
                })
            )
    }

    logOut()
    {
        localStorage.removeItem('token');
        this.router.navigate(['']);
    }
}