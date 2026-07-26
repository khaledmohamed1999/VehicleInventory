using VehicleInventory.DBManager.Models.Entities;
using VehicleInventory.DBManager.Models.DTOs;

namespace VehicleInventory.DBManager.Repositories
{
    public interface IVehicleRepository
    {
        Task<List<VehicleEntity>> GetAllVehicles();
        Task<VehicleEntity?> GetVehicleById(int id);
        Task<List<VehicleEntity>> SearchVehicles(VehicleSearchCriteria vehicleSearchCriteria);
        Task<bool> DriverHasVehicles(int driverId);
        Task<bool> VehicleLicensePlateExists(string licensePlate, int? excludeId = null);
        Task AddVehicle(VehicleEntity vehicle);
        void UpdateVehicle(VehicleEntity vehicle);
        void RemoveVehicle(VehicleEntity vehicle);
        Task<bool> SaveChanges();
    }

}
