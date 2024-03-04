import { Injectable } from "@angular/core";
import { ConvertedTimeInterface } from "../models/converted-time.interface";

Injectable({
    providedIn : 'root'
})
export class TimeConvertService
{

    divideTime(time : string) : ConvertedTimeInterface
    {
        const [hour, minutes] = time.split(':').map(Number);
        let minutesFormated : string = minutes.toString();

        if(minutesFormated.length === 1)
            minutesFormated = '0' + minutesFormated;

        const convertedTime : ConvertedTimeInterface = 
        {
            hour : hour.toString(),
            minutes : minutesFormated
        }

        return convertedTime;
    }

    timeToString(time : ConvertedTimeInterface) : string
    {
        if(time.hour.length === 1)
            return `0${time.hour}:${time.minutes}`;
        
        return `${time.hour}:${time.minutes}`;
    }

}

