using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using api._DTOs.OrderDTOs;
using api._DTOs.PaymentsDTOs;
using api._Entieties;
using api._Extensions;
using api._Interfaces;
using api.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
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
        private readonly IDayOffLocalRepository dayOffLocalRepository;
        private readonly IOpeningHourLocalRepository openingHourLocalRepository;
        private readonly IPaymentService paymentService;
        private readonly IPaymentRepository paymentRepository;
        private readonly IMapper mapper;

        public OrderController(IOrderRepository orderRepository, IOrderProductRepository orderProductRepository, IClientContactRepository clientContactRepository, IDeliveryDetailsRepository deliveryDetailsRepository, IDayOffLocalRepository dayOffLocalRepository, IOpeningHourLocalRepository openingHourLocalRepository, IPaymentService paymentService, IPaymentRepository paymentRepository, IMapper mapper)
        {
            this.orderRepository = orderRepository;
            this.orderProductRepository = orderProductRepository;
            this.clientContactRepository = clientContactRepository;
            this.deliveryDetailsRepository = deliveryDetailsRepository;
            this.dayOffLocalRepository = dayOffLocalRepository;
            this.openingHourLocalRepository = openingHourLocalRepository;
            this.paymentService = paymentService;
            this.paymentRepository = paymentRepository;
            this.mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<OrderPostDTO>> PlaceOrder(OrderPostDTO orderPostDTO)
        {
        
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            int orderPossiblity = await OrderMethodExtension.CheckOrderPossiblity(dayOffLocalRepository, openingHourLocalRepository, orderPostDTO.LocalId);

            if(orderPossiblity == 1)
                return BadRequest("Today is dayoff!");
            
            // else if(orderPossiblity == 2)
            //     return BadRequest("Closed at this time!");

             var order = new Order
            {
                Price = orderPostDTO.Price,
                OrderStatus = "nowe",
                WaitingTime = null,
                RefusalReason = null,
                LocalId = orderPostDTO.LocalId,
            };
            await orderRepository.AddOrderAsync(order);

            if(orderPostDTO.IsPaymentOnline == true)
            {
                var paymentResponse = await paymentService.RegisterAsync(orderPostDTO);

                if(paymentResponse.Data.Token == null)
                    return BadRequest("Error! Something went wrong!");

                var paymentsDetails = new PaymentsDetails
                {
                    OrderId = order.Id,
                    SessionId = paymentResponse.SessionId,
                    IsPaymentDone = false,
                };

                await paymentRepository.AddPaymentAsync(paymentsDetails);
            }

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

        [HttpGet]
        public async Task<ActionResult<List<OrderGetDTO>>> GetOrders([FromQuery] string orderStatus)
        {
            var localId = HttpContext.User.FindFirst(JwtRegisteredClaimNames.Name)?.Value;

            var orders = await orderRepository.GetOrdersByStatus(orderStatus, localId);
            return Ok(mapper.Map<List<OrderGetDTO>>(orders));
        }

        [AllowAnonymous]
        [HttpGet("{orderId}")]
        public async Task<ActionResult<OrderGetDTO>> GetOrder(string orderId)
        {
            var order = await orderRepository.GetOrderByOrderId(orderId);
            
            if(order == null)
                return NotFound("Order doesn't exist!");

            return Ok(mapper.Map<OrderGetDTO>(order));

        }

        [HttpPut("{orderId}")]
        public async Task<ActionResult<string>> HandleOrder(string orderId, OrderPutDTO orderPutDTO)
        {
            var localId = HttpContext.User.FindFirst(JwtRegisteredClaimNames.Name)?.Value;

            var order = await orderRepository.GetOrderByLocalId(localId, orderId);

            if(order == null)
                return NotFound("Order doesn't exists!");

            if(orderPutDTO.OrderStatus == "realizowane" && orderPutDTO.WaitingTime == null)
                return BadRequest("Waiting time is required!");

            if(orderPutDTO.OrderStatus == "anulowane" && orderPutDTO.RefusalReason == null)
                return BadRequest("Refusal reason is required!");

            order.OrderStatus = orderPutDTO.OrderStatus;
            order.RefusalReason = orderPutDTO.RefusalReason;
            order.WaitingTime = orderPutDTO.WaitingTime;

            orderRepository.Update(order);
            await orderRepository.SaveAllAsync();

           if(orderPutDTO.OrderStatus == "anulowane" || orderPutDTO.OrderStatus == "realizowane")
           {
                var link = $"{Request.Scheme}://{Request.Host}/api/order/{order.Id}";

                string senderEmail = "bartekkubik7@gmail.com";
                string senderPassword = "nbmw atok pztp wbjn";
                string recipientEmail = order.ClientsContact.Email;

                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587 ,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(senderEmail, senderPassword),
                    EnableSsl = true,
                };

                MailMessage mailMessage = new MailMessage(senderEmail, recipientEmail)
                {
                    Subject = "ItBurger - status zamówienia",
                    Body = "Kliknij w link aby wejść na stronę ze swoim zamówieniem: " + link
                };

                smtpClient.Send(mailMessage); 
           }

            return Ok(mapper.Map<OrderGetDTO>(order));
        }

        [AllowAnonymous]
        [HttpPost("confirm-payment")]
        public async Task<ActionResult<P24ReservationStatusModel>> PaymentConfirm(P24TransactionVerifyRequest p24TransactionVerifyRequest)
        {   
            var response = await paymentService.TransactionVerifyAsync(p24TransactionVerifyRequest);

            if(response.Data == null)
                return BadRequest(response.Error);

            return Ok(response);
        }

    }
}