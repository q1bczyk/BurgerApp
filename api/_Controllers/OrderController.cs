using api._DTOs.OrderDTOs;
using api._Entieties;
using api._Interfaces;
using api.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api._Controllers
{
    [Authorize]
    public class OrderController : BaseApiController
    {
        private readonly IOrderRepository orderRepository;
        private readonly IOrderProductRepository orderProductRepository;
        private readonly IClientContactRepository clientContactRepository;
        private readonly IDeliveryDetailsRepository deliveryDetailsRepository;
        private readonly ILocalRepository localRepository;
        private readonly IMapper mapper;

        public OrderController(IOrderRepository orderRepository, IOrderProductRepository orderProductRepository, IClientContactRepository clientContactRepository, IDeliveryDetailsRepository deliveryDetailsRepository, IMapper mapper)
        {
            this.orderRepository = orderRepository;
            this.orderProductRepository = orderProductRepository;
            this.clientContactRepository = clientContactRepository;
            this.deliveryDetailsRepository = deliveryDetailsRepository;
            this.mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<OrderPostDTO>> PlaceOrder(OrderPostDTO orderPostDTO)
        {
        
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            
             var order = new Order
            {
                Price = orderPostDTO.Price,
                OrderStatus = orderPostDTO.OrderStatus,
                LocalId = orderPostDTO.LocalId,
            };

            await orderRepository.AddOrderAsync(order);

            var clientsContact = new ClientsContact
            {
                Name = orderPostDTO.ClientsContact.Name,
                LastName = orderPostDTO.ClientsContact.Lastname,
                Email = orderPostDTO.ClientsContact.Email,
                PhoneNumber = orderPostDTO.ClientsContact.PhoneNumber,
                OrderId = order.Id,
            };
            await clientContactRepository.AddClientsContactAsync(clientsContact);

            DeliveryDetail deliveryDetails = null;

            if(orderPostDTO.ClientsContact.DeliveryDetails != null)
            {
                 deliveryDetails = new DeliveryDetail
                {
                    City = orderPostDTO.ClientsContact.DeliveryDetails.City,
                    PostalCode = orderPostDTO.ClientsContact.DeliveryDetails.PostalCode,
                    Street = orderPostDTO.ClientsContact.DeliveryDetails.Street,
                    HouseNumber = orderPostDTO.ClientsContact.DeliveryDetails.HouseNumber,
                    PaymentMethod = orderPostDTO.ClientsContact.DeliveryDetails.PaymentMethod,
                    ClientsContact = clientsContact,
                };

                await deliveryDetailsRepository.AddDeliveryDetailsAsync(deliveryDetails);
            }

            foreach(string productId in orderPostDTO.ProductsId)
            {
                var orderProduct = new OrderProduct
                {
                    ProductId = productId,
                    OrderId = order.Id,
                };

                await orderProductRepository.AddOrderAsync(orderProduct);
            }

            return Ok(mapper.Map<OrderPostDTO>(orderPostDTO));

        }
    }
}