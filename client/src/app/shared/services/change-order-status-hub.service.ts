import { EventEmitter, Injectable } from "@angular/core";
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from "src/environments/environment.development";

@Injectable({
    providedIn : 'root'
})

export class ChangeOrderStatusHubService
{
    hubUrl : string = environment.hubUrl + 'order-status';
    private hubConnection? : HubConnection;
    changeStatusReceived  = new EventEmitter<string>();

    createHubConnection(orderId : string)
    {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(this.hubUrl)
            .withAutomaticReconnect()
            .build();
        
        this.hubConnection.start()
            .then(() => {
                this.joinGroup(orderId);             
            })
            .catch(err => {
                console.log(err)
            })

        this.hubConnection.on("ChangeOrderStatusNotification", (orderId: string) => {
            this.changeStatusReceived.emit(orderId);
        });       
    }

    private joinGroup(orderId: string) 
    {
        if (this.hubConnection?.state === "Connected") 
            this.hubConnection.invoke("JoinGroup", orderId)
                .catch(error => {
                    console.error("Error while joining group:", error);
                });
        else 
            console.warn("Connection is not established. Cannot join group.");
          
    }

}