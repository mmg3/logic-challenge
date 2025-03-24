using AutoMapper;
using Grpc.Core;
using GrpcInventory.Contexts;
using GrpcInventory.InventoryProtoService;
using GrpcInventory.Models;
using GrpcInventory.Repositories;

namespace GrpcInventory.Services
{
    public class InventoryService(IMovementsRepository movementsRepository, ProductServiceClient productServiceClient, IMapper mapper,
        InventoryContext dbContext) : InventoryGrpc.InventoryGrpcBase
    {
        private readonly IMovementsRepository _movementsRepository = movementsRepository;
        private readonly ProductServiceClient _productServiceClient = productServiceClient;
        private readonly IMapper _mapper = mapper;
        private readonly InventoryContext _dbContext = dbContext;

        public override async Task<MovementMessage> AddMovement(MovementMessage request, ServerCallContext context)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                Movement movement = new ();
                try
                {
                    movement = _mapper.Map<Movement>(request);
                    movement = await _movementsRepository.CreateMovement(movement);

                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error al crear movimiento: {ex}");
                    transaction.Rollback();
                    throw;
                }
                try
                {
                    await _productServiceClient.UpdateStock(movement.ItemId, movement.Quantity, movement.Type);

                    transaction.Commit();

                    return _mapper.Map<MovementMessage>(movement);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error actualizando stock: {ex}");
                    transaction.Rollback();
                    throw;
                }
            }
        }
    }
}
