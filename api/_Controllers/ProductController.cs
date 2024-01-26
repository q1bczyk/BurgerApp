using api._DTOs.ProductDTOs;
using api._Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api._Controllers
{
    public class ProductController
    {
        private readonly IProductRepository productRepository;
        private readonly IIngredientRepository ingredientRepository;
        private readonly IIngredientProductRepository ingredientProductRepository;
        private readonly IMapper mapper;

        public ProductController(IProductRepository productRepository, IIngredientRepository ingredientRepository, IIngredientProductRepository ingredientProductRepository, IMapper mapper)
        {
            this.productRepository = productRepository;
            this.ingredientRepository = ingredientRepository;
            this.ingredientProductRepository = ingredientProductRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<ProductGetDTO>> AddProduct(ProductPostDTO productPostDTO)
        {
            
        }
    }
}