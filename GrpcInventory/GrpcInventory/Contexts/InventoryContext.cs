using GrpcInventory.Models;
using Microsoft.EntityFrameworkCore;

namespace GrpcInventory.Contexts;

public partial class InventoryContext : DbContext
{
    public InventoryContext()
    {
    }

    public InventoryContext(DbContextOptions<InventoryContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Movement> Movements { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Movement>(entity =>
        {
            entity.Property(e => e.Date);
            entity.Property(e => e.Detail);
            entity.Property(e => e.TotalPrice);
            entity.Property(e => e.Type);
            entity.Property(e => e.UnitPrice);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
