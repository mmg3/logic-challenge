using GrpcProduct.Contexts;
using GrpcProduct.Models;
using Microsoft.EntityFrameworkCore;

namespace GrpcProduct.Repositories
{
    public class ProductRepository(ProductContext context) : IProductRepository
    {
        private readonly ProductContext _context = context;

        public async Task<Item> Create(Models.Item item)
        {
            item.IsActive = true;
            _context.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<Item> Update(Item item)
        {
            var oldItem = await Get(item.Id);
            if (oldItem == null)
            {
                return new();
            }
            oldItem.Name = item.Name;
            oldItem.Description = item.Description;
            oldItem.CategoryId = item.CategoryId;
            oldItem.Image = item.Image;
            oldItem.Price = item.Price;
            oldItem.Stock = item.Stock;
            oldItem.IsActive = item.IsActive;

            _context.Update(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<Item> Delete(int id)
        {
            var item = await Get(id);
            item.IsActive = false;
            _context.Update(item);
            await _context.SaveChangesAsync();

            return item;
        }

        public async Task<Item> Get(int id)
        {
            var item = await _context.Items.FirstOrDefaultAsync(x => x.Id == id);

            return item ?? new();
        }

        public async Task<List<Item>> GetAll()
        {
            return await _context.Items.Where(item => item.IsActive).ToListAsync();
        }
    }
}
