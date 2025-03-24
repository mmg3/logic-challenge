using AutoMapper;
using GrpcInventory.Models;
using GrpcInventory.InventoryProtoService;

namespace GrpcInventory.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Movement, MovementMessage>()
                .ForMember(dest => dest.UnitPrice, opt => opt.MapFrom(src => (double)src.UnitPrice))
                .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => (double)src.TotalPrice))
                .ReverseMap()
                .ForMember(dest => dest.UnitPrice, opt => opt.MapFrom(src => (decimal)src.UnitPrice))
                .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => (decimal)src.TotalPrice));

            CreateMap<List<Movement>, MovementsProto>()
            .ForMember(dest => dest.Movements, opt => opt.MapFrom(src => src));

            CreateMap<IEnumerable<Movement>, MovementsProto>()
                .ForMember(dest => dest.Movements, opt => opt.MapFrom(src => src));
        }
    }
}
