using api._DTOs.IngredientDTOs;
using api._DTOs.ProductDTOs;
using api._Entieties;
using api._Interfaces;
using api.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api._Controllers
{
    public class ProductController : BaseApiController
    {
        private readonly IProductRepository productRepository;
        private readonly IIngredientRepository ingredientRepository;
        private readonly IIngredientProductRepository ingredientProductRepository;
        private readonly IFileService fileService;
        private readonly IMapper mapper;

        public ProductController(IProductRepository productRepository, IIngredientRepository ingredientRepository, IIngredientProductRepository ingredientProductRepository, IFileService fileService, IMapper mapper)
        {
            this.productRepository = productRepository;
            this.ingredientRepository = ingredientRepository;
            this.ingredientProductRepository = ingredientProductRepository;
            this.fileService = fileService;
            this.mapper = mapper;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ProductGetDTO>> AddProduct(ProductPostDTO productPostDTO)
        {

            if(await productRepository.FingProductByNameAsync(productPostDTO.Name) == true)
                return UnprocessableEntity("Product with this name has already existed!");

            // if (!fileService.IsFileExtensionAllowed(productPostDTO.File))
            //     return BadRequest("Invalid file format. Only .jpg, .jpeg, .png are allowed.");

            // string fileUrl = await fileService.UploadFileAsync(productPostDTO.File, productPostDTO.Name);

            // if(fileUrl == null)
            //     return BadRequest("File upload failed!");
                            
            var product = new Product
            {
                Price = productPostDTO.Price,
                Name = productPostDTO.Name,
                Type = productPostDTO.Type,
                OrderCount = 0,
                ImgUrl = "xd",
            };

            await productRepository.AddProductAsync(product);
        
            foreach(IngredientPostDTO ingredinentDTO in productPostDTO.Ingredients)
            {
                var ingredientId = await ingredientRepository.GetIngredientIdByNameAsync(ingredinentDTO.Name);

                if(ingredientId == null)
                {
                    var newIngredient = new Ingredient
                    {
                        Price = ingredinentDTO.Price,
                        Name = ingredinentDTO.Name,
                        Quantity = ingredinentDTO.Quantity,
                    };

                    await ingredientRepository.AddIngredientAsync(newIngredient);
                    ingredientId = newIngredient.Id;
                }
                
                var ingredientProduct = new IngredientProduct
                {
                    ProductId = product.Id,
                    IngredientId = ingredientId,
                };

                await ingredientProductRepository.AddIngredientProductAsync(ingredientProduct);
                return Ok("petla dziala");
            }

            return Ok(mapper.Map<ProductGetDTO>(product));
        }
    }
}