using VehicleInventory.DBManager.Models.Entities;

namespace VehicleInventory.DBManager.Repositories
{
    public interface IDriverRepository
    {
        Task<List<DriverEntity>> GetAllDrivers();
        Task<DriverEntity?> GetDriverById(int id);
        Task<List<DriverEntity>> SearchDrivers(DriverSearchCriteria driverSearchCriteria);
        Task AddDriver(DriverEntity driver);
        void UpdateDriver(DriverEntity driver);
        void RemoveDriver(DriverEntity driver);
        Task<bool> SaveChanges();
    }
}
