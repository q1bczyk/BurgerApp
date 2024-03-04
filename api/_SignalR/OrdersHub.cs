using Microsoft.AspNetCore.SignalR;

namespace api._SignalR
{
    public class OrderNotificationHub : Hub
    {
        public async Task JoinGroup(string localId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, localId);
        }
        public async Task NewOrderNotification(string localId, string orderId)
        {
            await Clients.Group(localId).SendAsync("NewOrderNotification", orderId);       
        }

    }
}