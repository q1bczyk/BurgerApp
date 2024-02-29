import { Injectable } from "@angular/core";
import { env } from "src/assets/env/env.development";
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
    providedIn : 'root'
})

export class OrderHubService
{
    hubUrl : string = env.hubUrl;
    private hubConnection? : HubConnection;

    createHubConnection()
    {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(this.hubUrl)
            .withAutomaticReconnect()
            .build();
        
        this.hubConnection.start()

        this.hubConnection.on("WelcomeMessage", message => {
            console.log(message);
        });
    }


}