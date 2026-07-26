using VehicleInventory.DBManager.Mappings.Driver;
using VehicleInventory.DBManager.Mappings.Vehicle;
using VehicleInventory.DBManager.Models.DTOs;
using VehicleInventory.DBManager.Models.Entities;
using VehicleInventory.DBManager.Repositories;

namespace VehicleInventory.Services
{
    public class DriverService : IDriverService
    {
        private readonly IDriverRepository _driverRepository;
        private readonly IVehicleService _vehicleService;

        public DriverService(IDriverRepository driverRepository, IVehicleService vehicleService)
        {
            _driverRepository = driverRepository;
            _vehicleService = vehicleService;
        }

        public async Task<List<DriverDto>> GetAllDrivers()
        {
            var drivers = await _driverRepository.GetAllDrivers();
            return drivers.ToDriverDtoList();
        }

        public async Task<DriverDto> GetDriverById(int id)
        {
            var driver = await CheckDriverExist(id);
            return driver.ToDriverDto();
        }

        public async Task<List<DriverDto>> SearchDrivers(DriverSearchModelDto driverSearchModel)
        {
            var driverSearchCriteria = driverSearchModel.ToDriverSearchCriteria();
            var drivers = await _driverRepository.SearchDrivers(driverSearchCriteria);
            return drivers.ToDriverDtoList();
        }

        public async Task<DriverDto> CreateDriver(CreateDriverDto driverDto)
        {
            var driver = driverDto.ToDriverEntity();

            await _driverRepository.AddDriver(driver);
            await _driverRepository.SaveChanges();
            return driver.ToDriverDto();
        }

        public async Task<DriverDto> UpdateDriver(int id, UpdateDriverDto driverDto)
        {
            var driver = await CheckDriverExist(id);

            driverDto.ApplyToDriverEntity(driver);
            driver.UpdatedAt = DateTime.Now;

            _driverRepository.UpdateDriver(driver);
            await _driverRepository.SaveChanges();

            return driver.ToDriverDto();
        }

        public async Task DeleteDriver(int id)
        {
            var driver = await CheckDriverExist(id);

            var hasVehicles = await _vehicleService.DriverHasVehicles(id);
            if (hasVehicles)
                throw new ConflictException($"Driver with id {id} has vehicles assigned and cannot be deleted. Unassign their vehicles first.");

            _driverRepository.RemoveDriver(driver);
            await _driverRepository.SaveChanges();
        }

        private async Task<DriverEntity> CheckDriverExist(int id)
        {
            var driver = await _driverRepository.GetDriverById(id);
            if (driver is null)
                throw new NotFoundException($"Driver with id {id} was not found.");

            return driver;
        }
    }
}
