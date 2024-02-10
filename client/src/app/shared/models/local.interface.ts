export interface LocalInterface
{
    id : string;
    name : string;
    contact : ContactResponseInterface;
    openingHours[] : OpeningHourResponseInterface;
    dayOffs[] : DayOffResponseInterface;
}