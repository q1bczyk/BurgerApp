using Microsoft.AspNetCore.SignalR;

namespace api._SignalR
{
    public class OrdersHub : Hub
    {
        public async Task WelcomeMessage()
        {
            Console.WriteLine("WelcomeMessage method called");
           await Clients.Others.SendAsync("WelcomeMessage", "xd");             
        }

    }
}