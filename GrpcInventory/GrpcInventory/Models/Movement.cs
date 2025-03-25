using GrpcInventory.Enums;

namespace GrpcInventory.Models;

public partial class Movement
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public MovementTypeEnum Type { get; set; }

    public int ItemId { get; set; }

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public decimal TotalPrice { get; set; }

    public string? Detail { get; set; }

}
