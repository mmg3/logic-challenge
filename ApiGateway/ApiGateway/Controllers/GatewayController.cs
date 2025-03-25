using ApiGateway.InventoryProtoService;
using ApiGateway.ProductProtoService;
using ApiGateway.Services;
using GrpcProduct.Enums;
using Microsoft.AspNetCore.Mvc;

namespace ApiGateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GatewayController(InventoryClientService inventoryClientService, ProductClientService productClientService) : ControllerBase
    {
        private readonly InventoryClientService _inventoryClientService = inventoryClientService;
        private readonly ProductClientService _productClientService = productClientService;

        [HttpPost("CreateProduct")]
        public async Task<IActionResult> CreateProduct([FromBody]ItemProto product)
        {
            return Ok(await _productClientService.CreateProduct(product));
        }

        [HttpGet("GetProduct/{productId}")]
        public async Task<IActionResult> GetProduct(int productId)
        {
            return Ok(await _productClientService.GetProduct(new SingleProduct { Id = productId }));
        }

        [HttpPut("UpdateProduct")]
        public async Task<IActionResult> UpdateProduct([FromBody] ItemProto product)
        {
            if (product.OldStock != product.Stock)
            {
                var movement = new MovementMessage
                {
                    ItemId = product.Id,
                    Quantity = product.Stock,
                    Type = "ADJUSTMENT",
                    Detail = "Stock adjustment",
                    Date = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"),
                    UnitPrice = product.Price,
                    TotalPrice = product.Price * product.Stock
                };
                await _inventoryClientService.AddMovement(movement);
            }
            return Ok(await _productClientService.UpdateProduct(product));
        }

        [HttpDelete("DeleteProduct/{productId}")]
        public async Task<IActionResult> DeleteProduct(int productId)
        {
            return Ok(await _productClientService.DeleteProduct(new SingleProduct { Id = productId }));
        }

        [HttpGet("GetAllPaginatedProducts/{offset}/{limit}")]
        public async Task<IActionResult> GetAllPaginatedProducts(int offset = 1, int limit = 10)
        {
            return Ok(await _productClientService.GetAllPaginatedProducts(new ProductPaginatedRequest { Offset = offset, Limit = limit }));
        }

        [HttpGet("GetAllProducts")]
        public async Task<IActionResult> GetAllProducts()
        {
            return Ok(await _productClientService.GetAllProducts(new EmptyRequest()));
        }

        [HttpGet("GetAllCategories")]
        public async Task<IActionResult> GetAllCategories()
        {
            return Ok(await _productClientService.GetAllCategories(new EmptyRequest()));
        }

        [HttpPost("AddMovement")]
        public async Task<IActionResult> AddMovement([FromBody] MovementMessage movement)
        {
            return Ok(await _inventoryClientService.AddMovement(movement));
        }

        [HttpGet("GetAllMovements")]
        public async Task<IActionResult> GetAllMovements()
        {
            return Ok(await _inventoryClientService.GetAllMovements(new Empty()));
        }

        [HttpGet("GetMovementByProductId/{productId}")]
        public async Task<IActionResult> GetMovementByProductId(int productId)
        {
            return Ok(await _inventoryClientService.GetMovementByProductId(new ProductIdMessage { ProductId = productId }));
        }
    }
}
