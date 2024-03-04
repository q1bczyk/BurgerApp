import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name : 'openingHoursPipe'
})
export class OpeningHourPipe implements PipeTransform
{
    transform(time : string) : string 
    {
        if(time.charAt(0) === '0')
            return time.substring(1);

        else return time;
    }
}