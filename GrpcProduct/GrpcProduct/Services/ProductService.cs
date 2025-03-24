using AutoMapper;
using Grpc.Core;
using GrpcProduct.Enums;
using GrpcProduct.Models;
using GrpcProduct.ProductProtoService;
using GrpcProduct.Repositories;

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
            var updatedItem = await _productRepository.Update(_mapper.Map<Item>(request));

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

            var updatedItem = await _productRepository.Update(_mapper.Map<Item>(request));

            return _mapper.Map<ItemProto>(updatedItem);
        }
        public override async Task<ItemProto> DeleteProduct(SingleProduct request, ServerCallContext context)
        {
            var deletedItem = await _productRepository.Delete(request.Id);

            return _mapper.Map<ItemProto>(deletedItem);
        }

        public override async Task<ItemProto> GetAllProducts(EmptyRequest request, ServerCallContext context)
        {
            var items = await _productRepository.GetAll();

            return _mapper.Map<ItemProto>(items);
        }
    }
}
