using api._DTOs.ProductDTOs;
using api._Interfaces;
using api.Controllers;
using AutoMapper;
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

        [HttpPost]
        public async Task<ActionResult<string>> AddProduct(ProductPostDTO productPostDTO)
        {
            if (!fileService.IsFileExtensionAllowed(productPostDTO.File))
                return BadRequest("Invalid file format. Only .jpg, .jpeg, .png are allowed.");

            int uploadStatus = await fileService.UploadFileAsync(productPostDTO.File, productPostDTO.Name);

            if(uploadStatus != 201 || uploadStatus != 200)
                return BadRequest(uploadStatus + ": File upload failed!");
                            
            
            
        }
    }
}