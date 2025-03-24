using GrpcInventory.Contexts;
using GrpcInventory.Mappers;
using GrpcInventory.Repositories;
using GrpcInventory.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc();

string? _connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<InventoryContext>(options =>
    options.UseSqlServer(_connectionString)
);

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

builder.Services.AddScoped<IProductInventoryRepository, ProductInventoryRepository>();
builder.Services.AddScoped<IMovementsRepository, MovementsRepository>();
builder.Services.AddScoped<InventoryService>();

var app = builder.Build();

app.MapGrpcService<InventoryService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
