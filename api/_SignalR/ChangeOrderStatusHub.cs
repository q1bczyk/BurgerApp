using Microsoft.AspNetCore.SignalR;

namespace api._SignalR
{
    public class ChangeOrderStatusHub : Hub
    {
        public async Task JoinGroup(string orderId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, orderId);
        }

         public async Task ChangeOrderStatusNotification(string orderId)
        {
            await Clients.Group(orderId).SendAsync("ChangeOrderStatusNotification", orderId);       
        }
    }
}