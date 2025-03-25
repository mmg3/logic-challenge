using AutoMapper;
using Grpc.Core;
using GrpcProduct.Enums;
using GrpcProduct.Models;
using GrpcProduct.ProductProtoService;
using GrpcProduct.Repositories;
using Microsoft.EntityFrameworkCore;

namespace GrpcProduct.Services
{
    public class ProductService(IProductRepository productRepository, IMapper mapper) : ProductGrpc.ProductGrpcBase
    {
        private readonly IProductRepository _productRepository = productRepository;
        private readonly IMapper _mapper = mapper;

        public override async Task<ItemProto> CreateProduct(ItemProto request, ServerCallContext context)
        {
            var newItem = await _productRepository.Create(_mapper.Map<Item>(request));

            return _mapper.Map<ItemProto>(newItem);
        }

        public override async Task<ItemProto> GetProduct(SingleProduct request, ServerCallContext context)
        {
            var item = await _productRepository.Get(request.Id);

            return _mapper.Map<ItemProto>(item);
        }

        public override async Task<ItemProto> UpdateProduct(ItemProto request, ServerCallContext context)
        {
            var itemToUpdate = _mapper.Map<Item>(request);
            var updatedItem = await _productRepository.Update(itemToUpdate);

            return _mapper.Map<ItemProto>(updatedItem);
        }

        public override async Task<ItemProto> UpdateStock(UpdateStockProto request, ServerCallContext context)
        {
            var item = await _productRepository.Get(request.Id);

            if (Enum.TryParse<MovementTypeEnum>(request.MovementType, true, out MovementTypeEnum movementType))
            {
                switch (movementType)
                {
                    case MovementTypeEnum.IN:
                        item.Stock += request.Quantity;
                        break;
                    case MovementTypeEnum.OUT:
                        item.Stock -= request.Quantity;
                        break;
                    case MovementTypeEnum.ADJUSTMENT:
                        item.Stock = request.Quantity;
                        break;
                    default:
                        throw new ArgumentException($"Tipo de movimiento no válido: {request.MovementType}");
                }
            }
            else
            {
                throw new ArgumentException($"Tipo de movimiento no válido: {request.MovementType}");
            }
            var updatedItem = await _productRepository.Update(item);

            return _mapper.Map<ItemProto>(updatedItem);
        }
        public override async Task<ItemProto> DeleteProduct(SingleProduct request, ServerCallContext context)
        {
            var deletedItem = await _productRepository.Delete(request.Id);

            return _mapper.Map<ItemProto>(deletedItem);
        }

        public override async Task<ItemsPaginatedProto> GetAllPaginatedProducts(ProductPaginatedRequest request, ServerCallContext context)
        {
            
            var paginated = await _productRepository.GetAll(request.Offset, request.Limit);

            var itemsProto = _mapper.Map<ItemsProto>(paginated.Items);

            return new ItemsPaginatedProto
            {
                Items = itemsProto,
                TotalItems = paginated.TotalItems,
                TotalPages = paginated.TotalPages,
                CurrentPage = request.Offset
            };
        }

        public override async Task<ItemsProto> GetAllProducts(EmptyRequest request, ServerCallContext context)
        {
            var items = await _productRepository.GetAll();
            return _mapper.Map<ItemsProto>(items);
        }

        public override async Task<CategoriesProto> GetAllCategories(EmptyRequest request, ServerCallContext context)
        {
            var items = await _productRepository.GetAllCategories();

            return _mapper.Map<CategoriesProto>(items);
        }
    }
}
