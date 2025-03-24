namespace GrpcProduct.Models;

public partial class Item
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public int CategoryId { get; set; }

    public string Image { get; set; }

    public decimal Price { get; set; }

    public int Stock { get; set; }

    public bool IsActive { get; set; }

    public virtual Category? Category { get; set; }
}
