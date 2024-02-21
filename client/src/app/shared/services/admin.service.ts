import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";

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

    logOut()
    {
        localStorage.removeItem('token');
        this.router.navigate(['']);
    }
}