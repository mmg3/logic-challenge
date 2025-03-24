using GrpcInventory.InventoryProtoService;
using GrpcInventory.Models;

namespace GrpcInventory.Repositories
{
    public interface IMovementsRepository
    {
        Task<Movement> CreateMovement(Movement movement);
        Task<List<Movement>> GetAllMovements();
        Task<List<Movement>> GetMovementsByProductId(int productId);
    }
}