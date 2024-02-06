namespace api._Extensions
{
    public static class DayOffExtensions
    {
        public static bool IsPastData(string dateString)
        {
            if (DateTime.TryParseExact(dateString, "dd/MM/yyyy", null, System.Globalization.DateTimeStyles.None, out DateTime date))
                return date.Date <= DateTime.Now.Date;
            
            return false;
        }

    }
}