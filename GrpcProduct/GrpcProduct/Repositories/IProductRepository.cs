using GrpcProduct.Models;

namespace GrpcProduct.Repositories
{
    public interface IProductRepository
    {
        Task<Item> Create(Item item);
        Task<Item> Delete(int id);
        Task<Item> Get(int id);
        Task<List<Item>> GetAll();
        Task<Item> Update(Item item);
    }
}