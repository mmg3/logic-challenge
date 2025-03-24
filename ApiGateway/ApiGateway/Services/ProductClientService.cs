using ApiGateway.ProductProtoService;
using Grpc.Net.Client;

namespace ApiGateway.Services
{
    public class ProductClientService
    {
        private readonly ProductGrpc.ProductGrpcClient _client;

        /*
        rpc GetAllProducts (EmptyRequest) returns (ItemProto);
         * */

        public ProductClientService(IConfiguration configuration)
        {
            GrpcChannelOptions channelOptions = new()
            {
                MaxReceiveMessageSize = int.MaxValue,
                MaxSendMessageSize = int.MaxValue
            };

            var channel = GrpcChannel.ForAddress(configuration["ProductServiceUrl"], channelOptions);
            _client = new ProductGrpc.ProductGrpcClient(channel);
        }

        public async Task<ItemProto> CreateProduct(ItemProto request)
        {
            try
            {
                ItemProto reply = await _client.CreateProductAsync(request);
                return reply;
            }
            catch
            {
                throw;
            }
        }

        public async Task<ItemProto> GetProduct(SingleProduct request)
        {
            try
            {
                ItemProto reply = await _client.GetProductAsync(request);
                return reply;
            }
            catch
            {
                throw;
            }
        }

        public async Task<ItemProto> UpdateProduct(ItemProto request)
        {
            try
            {
                ItemProto reply = await _client.UpdateProductAsync(request);
                return reply;
            }
            catch
            {
                throw;
            }
        }

        public async Task<ItemProto> DeleteProduct(SingleProduct request)
        {
            try
            {
                ItemProto reply = await _client.DeleteProductAsync(request);
                return reply;
            }
            catch
            {
                throw;
            }
        }

        public async Task<ItemsProto> GetAllProducts(EmptyRequest request)
        {
            try
            {
                ItemsProto reply = await _client.GetAllProductsAsync(request);
                return reply;
            }
            catch
            {
                throw;
            }
        }
    }
}
