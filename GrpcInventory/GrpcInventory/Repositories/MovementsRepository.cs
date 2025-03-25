using Grpc.Core;
using GrpcInventory.Contexts;
using GrpcInventory.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<List<Movement>> GetAllMovements()
        {
            return await _context.Movements.ToListAsync();
        }

        public async Task<List<Movement>> GetMovementsByProductId(int productId)
        {
            var movements = await _context.Movements.Where(m => m.ItemId == productId).OrderByDescending(o => o.ItemId).ToListAsync();
            return movements;
        }
    }
}
