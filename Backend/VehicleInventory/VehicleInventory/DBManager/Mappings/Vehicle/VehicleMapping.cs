using VehicleInventory.DBManager.Mappings.Driver;
using VehicleInventory.DBManager.Models.DTOs;
using VehicleInventory.DBManager.Models.Entities;

namespace VehicleInventory.DBManager.Mappings.Vehicle
{
    public static class VehicleMapping
    {
        public static VehicleDto ToVehicleDto(this VehicleEntity entity)
        {
            return new VehicleDto
            {
                Id = entity.Id,
                LicensePlate = entity.LicensePlate,
                Model = entity.Model,
                Year = entity.Year,
                Type = entity.Type,
                Status = entity.Status,
                Mileage = entity.Mileage,
                AssignedDriver = entity.AssignedDriver?.ToDriverDto(),
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt
            };
        }

        public static List<VehicleDto> ToVehicleDtoList(this IEnumerable<VehicleEntity> entities)
        {
            return entities.Select(ToVehicleDto).ToList();
        }

        public static VehicleEntity ToVehicleEntity(this CreateVehicleDto dto)
        {
            return new VehicleEntity
            {
                LicensePlate = dto.LicensePlate ?? string.Empty,
                DriverId = dto.DriverId,
                Model = dto.Model,
                Year = dto.Year ?? 0,
                Type = dto.Type,
                Status = dto.Status,
                Mileage = dto.Mileage
            };
        }

        public static VehicleSearchCriteria ToVehicleSearchCriteria(this VehicleSearchModelDto dto)
        {
            return new VehicleSearchCriteria
            {
                LicensePlate = dto.LicensePlate,
                DriverId = dto.DriverId,
                Model = dto.Model,
                Year = dto.Year,
                Type = dto.Type,
                Status = dto.Status
            };
        }

        public static void ApplyToVehicleEntity(this UpdateVehicleDto dto, VehicleEntity entity)
        {
            entity.LicensePlate = dto.LicensePlate ?? entity.LicensePlate;
            entity.DriverId = dto.DriverId;
            entity.Model = dto.Model;
            entity.Year = dto.Year ?? entity.Year;
            entity.Type = dto.Type;
            entity.Status = dto.Status;
            entity.Mileage = dto.Mileage;
        }
    }
}
