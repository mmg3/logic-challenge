using GrpcInventory.Models;

namespace GrpcInventory.Repositories
{
    public interface IMovementsRepository
    {
        Task<Movement> CreateMovement(Movement movement);
    }
}