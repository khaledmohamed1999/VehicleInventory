using VehicleInventory.DBManager.Models.DTOs;
using VehicleInventory.DBManager.Models.Entities;

namespace VehicleInventory.Services
{
    public interface IVehicleService
    {
        Task<List<VehicleDto>> GetAllVehicles();
        Task<VehicleDto> GetVehicleById(int id);
        Task<List<VehicleDto>> SearchVehicles(VehicleSearchModelDto vehicleSearchModel);
        Task<VehicleDto> CreateVehicle(CreateVehicleDto vehicleDto);
        Task<VehicleDto> UpdateVehicle(int id, UpdateVehicleDto vehicleDto);
        Task DeleteVehicle(int id);
        Task<bool> DriverHasVehicles(int driverId);
    }
}
