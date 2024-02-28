using Microsoft.AspNetCore.SignalR;

namespace api._SignalR
{
    public class OrdersHub : Hub
    {
        // public override async Task UpdateOrderStatus(int orderId)
        // {
        //     await Clients.Group($"order_{orderId}").SendAsync("ReceiveOrderStatusUpdate");
        // }
    }
}