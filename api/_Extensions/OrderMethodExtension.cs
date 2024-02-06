using System.Globalization;
using api._Interfaces;
using api._Repositories;

namespace api._Extensions
{
    public static class OrderMethodExtension
    {
        public async static Task<bool> IsDayOff(IDayOffLocalRepository dayOffLocalRepository, IOpeningHourLocalRepository openingHourLocalRepository, string localId)
        {
            DateTime date = DateTime.Now;
            CultureInfo polishCulture = CultureInfo.GetCultureInfo("pl-PL");

            string formatedDate = date.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture);
            string dayOffWeek = date.ToString("dddd", polishCulture);
            
            //funkcja sprawdza czy podana data znajduje sie w bazie danych z dniami otwarcia
            var isDayOff = await openingHourLocalRepository.CheckIsDayOffByLocalId(localId, dayOffWeek);

            //funkcja sprawdza czy podana data znajduje sie w bazie danych z datami wolnymi
            var isDateOff= await dayOffLocalRepository.DayOffExist(formatedDate, localId);

            //zwracamy alternatywe logiczna
            return isDateOff || isDayOff;
        }

        
    }
}