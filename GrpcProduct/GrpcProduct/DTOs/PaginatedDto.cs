using GrpcProduct.Models;

namespace GrpcProduct.DTOs
{
    public class PaginatedDto
    {
        public List<Item>? Items { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
    }
}
