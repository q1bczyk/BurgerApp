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

            Console.WriteLine(orderPostDTO.LocalId);

            if(!await localRepository.IsLocalExists(orderPostDTO.LocalId))
                return NotFound("Local with this id doesn't exist!");

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
                };

                await deliveryDetailsRepository.AddDeliveryDetailsAsync(deliveryDetails);
            }

            var clientsContact = new ClientsContact
            {
                Name = orderPostDTO.ClientsContact.Name,
                LastName = orderPostDTO.ClientsContact.Lastname,
                Email = orderPostDTO.ClientsContact.Email,
                PhoneNumber = orderPostDTO.ClientsContact.PhoneNumber,
                DeliveryDetail = deliveryDetails
            };

            await clientContactRepository.AddClientsContactAsync(clientsContact);

            var order = new Order
            {
                Price = orderPostDTO.Price,
                OrderStatus = orderPostDTO.OrderStatus,
                ClientsContact = clientsContact,
                LocalId = orderPostDTO.LocalId,
            };

            await orderRepository.AddOrderAsync(order);

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