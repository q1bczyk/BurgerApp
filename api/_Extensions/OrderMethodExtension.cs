using System.Globalization;
using api._Interfaces;
using api._Repositories;

namespace api._Extensions
{
    public static class OrderMethodExtension
    {
        private static DateTime date = DateTime.Now;
        private static CultureInfo polishCulture = CultureInfo.GetCultureInfo("pl-PL");
        private static string formatedDate = date.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture);
        private static string dayOffWeek = date.ToString("dddd", polishCulture);

        public async static Task<int> CheckOrderPossiblity(IDayOffLocalRepository dayOffLocalRepository, IOpeningHourLocalRepository openingHourLocalRepository, string localId)
        {
            if(await IsDayOff(dayOffLocalRepository, openingHourLocalRepository, localId) == true)
                return 1; // dzien wolny
            
            if(await CheckOpeningHours(openingHourLocalRepository, localId) == false)
                return 2; 

            return 0;
        }
        private async static Task<bool> IsDayOff(IDayOffLocalRepository dayOffLocalRepository, IOpeningHourLocalRepository openingHourLocalRepository, string localId)
        {
            //funkcja sprawdza czy podana data znajduje sie w bazie danych z dniami otwarcia
            var isDayOff = await openingHourLocalRepository.CheckIsDayOffByLocalId(localId, dayOffWeek);

            //funkcja sprawdza czy podana data znajduje sie w bazie danych z datami wolnymi
            var isDateOff= await dayOffLocalRepository.DayOffExist(formatedDate, localId);

            //zwracamy alternatywe logiczna
            return isDateOff || isDayOff;
        }

        private async static Task<bool> CheckOpeningHours(IOpeningHourLocalRepository openingHourLocalRepository, string localId)
        {
            var openingHour = await openingHourLocalRepository.GetOpeningHourByLocalIdAsync(localId, dayOffWeek);

            if(openingHour == null)
                return false;   

            string inputFormat = "HH:mm";
            DateTime closedTime;
            DateTime openedTime;

            DateTime.TryParseExact(openingHour.Opened, inputFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out openedTime);
            DateTime.TryParseExact(openingHour.Closed, inputFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out closedTime);

             if (date <= openedTime || date >= closedTime.AddMinutes(-30))
                return false;
            
            return true;
        }
    }
}