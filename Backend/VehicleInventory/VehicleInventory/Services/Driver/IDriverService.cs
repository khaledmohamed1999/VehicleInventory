using VehicleInventory.DBManager.Models.DTOs;
using VehicleInventory.DBManager.Models.Entities;

namespace VehicleInventory.Services
{
    public interface IDriverService
    {
        Task<List<DriverDto>> GetAllDrivers();
        Task<DriverDto> GetDriverById(int id);
        Task<List<DriverDto>> SearchDrivers(DriverSearchModelDto driverSearchModel);
        Task<DriverDto> CreateDriver(CreateDriverDto driverDto);
        Task<DriverDto> UpdateDriver(int id, UpdateDriverDto driverDto);
        Task DeleteDriver(int id);
    }
}
