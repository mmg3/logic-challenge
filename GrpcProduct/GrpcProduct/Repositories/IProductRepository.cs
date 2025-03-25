using GrpcProduct.DTOs;
using GrpcProduct.Models;

namespace GrpcProduct.Repositories
{
    public interface IProductRepository
    {
        Task<Item> Create(Item item);
        Task<Item> Delete(int id);
        Task<Item> Get(int id);
        Task<PaginatedDto> GetAll(int skip = 1, int pageSize = 10);
        Task<List<Item>> GetAll();
        Task<Item> Update(Item item);
        Task<List<Category>> GetAllCategories();
    }
}