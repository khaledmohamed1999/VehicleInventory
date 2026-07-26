using VehicleInventory.DBManager.Models.DTOs;
using VehicleInventory.DBManager.Models.Entities;

namespace VehicleInventory.DBManager.Mappings.Driver
{
    public static class DriverMapping
    {
        public static DriverDto ToDriverDto(this DriverEntity entity)
        {
            return new DriverDto
            {
                Id = entity.Id,
                Name = entity.Name,
                Phone = entity.Phone,
                DOB = entity.DOB,
                Level = entity.Level,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt
            };
        }

        public static List<DriverDto> ToDriverDtoList(this IEnumerable<DriverEntity> entities)
        {
            return entities.Select(ToDriverDto).ToList();
        }

        public static DriverEntity ToDriverEntity(this CreateDriverDto dto)
        {
            return new DriverEntity
            {
                Name = dto.Name,
                Phone = dto.Phone,
                DOB = dto.DOB ?? default,
                Level = dto.Level
            };
        }

        public static DriverSearchCriteria ToDriverSearchCriteria(this DriverSearchModelDto dto)
        {
            return new DriverSearchCriteria
            {
                Name = dto.Name,
                Level = dto.Level
            };
        }

        public static void ApplyToDriverEntity(this UpdateDriverDto dto, DriverEntity entity)
        {
            entity.Name = dto.Name;
            entity.Phone = dto.Phone;
            entity.DOB = dto.DOB ?? entity.DOB;
            entity.Level = dto.Level;
        }
    }
}
