using AutoMapper;
using GrpcProduct.Models;
using GrpcProduct.ProductProtoService;

namespace GrpcProduct.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ItemProto, Item>()
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => (decimal)src.Price))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
                .ReverseMap()
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => (double)src.Price));

            CreateMap<CategoryProto, Category>()
                .ReverseMap();

            CreateMap<List<Item>, ItemsProto>()
            .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src));

            CreateMap<IEnumerable<Item>, ItemsProto>()
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src));

        }
    }
}
