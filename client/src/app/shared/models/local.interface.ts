import { ContactResponseInterface } from "./contact-response.interface";
import { DayOffResponseInterface } from "./dayoff-response.interface";
import { OpeningHourResponseInterface } from "./opening-hour-response.interface";

export interface LocalInterface
{
    id : string;
    name : string;
    slug : string;
    contact : ContactResponseInterface;
    openingHours : OpeningHourResponseInterface[];
    dayOffs : DayOffResponseInterface[];
}