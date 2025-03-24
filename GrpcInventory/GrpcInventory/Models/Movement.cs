using GrpcInventory.InventoryProtoService;
using System;
using System.Collections.Generic;

namespace GrpcInventory.Models;

public partial class Movement
{
    public int Id { get; set; }

    public string Date { get; set; } = null!;

    public MovementType Type { get; set; }

    public int ItemId { get; set; }

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public decimal TotalPrice { get; set; }

    public string Detail { get; set; } = null!;

}
