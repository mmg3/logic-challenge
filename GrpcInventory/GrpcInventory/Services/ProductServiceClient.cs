using Grpc.Net.Client;
using GrpcInventory.Enums;
using GrpcInventory.InventoryProtoService;
using GrpcInventory.ProductProtoService;

namespace GrpcInventory.Services
{
    public class ProductServiceClient
    {
        private readonly ProductGrpc.ProductGrpcClient _client;

        public ProductServiceClient(IConfiguration configuration)
        {
            GrpcChannelOptions channelOptions = new()
            {
                MaxReceiveMessageSize = int.MaxValue,
                MaxSendMessageSize = int.MaxValue
            };

            var channel = GrpcChannel.ForAddress(configuration["ProductServiceUrl"], channelOptions);
            _client = new ProductGrpc.ProductGrpcClient(channel);
        }

        public async Task<UpdateStockResponse> UpdateStock(int id, int quantity, MovementTypeEnum movementType)
        {
            try
            {
                UpdateStockProto item = new();

                var request = new UpdateStockProto
                {
                    Id = id,
                    Quantity = quantity,
                    MovementType = movementType.GetType().Name
                };

                var reply = await _client.UpdateStockAsync(request);
                return reply;
            }
            catch
            {
                throw;
            }
        }
    }
}
