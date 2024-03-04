import { EventEmitter, Injectable } from "@angular/core";
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from "src/environments/environment.development";

@Injectable({
    providedIn : 'root'
})

export class OrderHubService
{
    hubUrl : string = environment.hubUrl + 'new-order';
    private hubConnection? : HubConnection;
    newOrderReceived  = new EventEmitter<string>();

    createHubConnection(localId : string)
    {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(this.hubUrl)
            .withAutomaticReconnect()
            .build();
        
        this.hubConnection.start()
            .then(() => {
                this.joinGroup(localId);             
            })
            .catch(err => {
                console.log(err)
            })

        this.hubConnection.on("NewOrderNotification", (orderId: string) => {
            this.newOrderReceived.emit(orderId);
        });       
    }

    private joinGroup(localId: string) 
    {
        if (this.hubConnection?.state === "Connected") 
            this.hubConnection.invoke("JoinGroup", localId)
                .catch(error => {
                    console.error("Error while joining group:", error);
                });
        else 
            console.warn("Connection is not established. Cannot join group.");
          
    }

}