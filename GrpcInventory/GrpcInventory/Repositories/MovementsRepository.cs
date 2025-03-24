using GrpcInventory.Contexts;
using GrpcInventory.Models;

namespace GrpcInventory.Repositories
{
    public class MovementsRepository(InventoryContext context) : IMovementsRepository
    {
        private readonly InventoryContext _context = context;

        public async Task<Movement> CreateMovement(Movement movement)
        {
            _context.Movements.Add(movement);
            await _context.SaveChangesAsync();
            return movement;
        }
    }
}
