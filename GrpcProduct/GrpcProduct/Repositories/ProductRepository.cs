using Azure.Core;
using GrpcProduct.Contexts;
using GrpcProduct.DTOs;
using GrpcProduct.Models;
using GrpcProduct.ProductProtoService;
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
            oldItem.IsActive = true;

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

        public async Task<PaginatedDto> GetAll(int offset = 1, int pageSize = 10)
        {
            var skip = (offset - 1) * pageSize;
            var items = await _context.Items.Where(item => item.IsActive)
                                        .Skip(skip)
                                        .Take(pageSize)
                                        .ToListAsync();

            var totalProducts = await _context.Items.Where(item => item.IsActive).CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalProducts / pageSize);


            return new PaginatedDto
            {
                Items = items,
                TotalItems = totalProducts,
                TotalPages = totalPages,
                CurrentPage = offset
            };
        }
        public async Task<List<Item>> GetAll()
        {
            return await _context.Items.Where(item => item.IsActive).ToListAsync();
        }
        public async Task<List<Category>> GetAllCategories()
        {
            return await _context.Categories.ToListAsync();
        }
    }
}
