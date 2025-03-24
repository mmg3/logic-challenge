using ApiGateway.InventoryProtoService;
using Grpc.Net.Client;

namespace ApiGateway.Services
{
    public class InventoryClientService
    {
        private readonly InventoryGrpc.InventoryGrpcClient _client;

        public InventoryClientService(IConfiguration configuration)
        {
            GrpcChannelOptions channelOptions = new()
            {
                MaxReceiveMessageSize = int.MaxValue,
                MaxSendMessageSize = int.MaxValue
            };

            var channel = GrpcChannel.ForAddress(configuration["InventoryServiceUrl"], channelOptions);
            _client = new InventoryGrpc.InventoryGrpcClient(channel);
        }
        /*
           rpc AddMovement(MovementMessage) returns (MovementMessage);
  rpc GetAllMovements(Empty) returns (MovementsProto);
  rpc GetMovementByProductId(MovementMessage) returns (MovementsProto);
        */
        public async Task<MovementMessage> AddMovement(MovementMessage request)
        {
            try
            {
                MovementMessage reply = await _client.AddMovementAsync(request);
                return reply;
            }
            catch
            {
                throw;
            }
        }

        public async Task<MovementsProto> GetAllMovements(Empty request)
        {
            try
            {
                MovementsProto reply = await _client.GetAllMovementsAsync(request);
                return reply;
            }
            catch
            {
                throw;
            }
        }

        public async Task<MovementsProto> GetMovementByProductId(ProductIdMessage request)
        {
            try
            {
                MovementsProto reply = await _client.GetMovementByProductIdAsync(request);
                return reply;
            }
            catch
            {
                throw;
            }
        }
    }
}
