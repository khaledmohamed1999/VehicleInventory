using VehicleInventory.DBManager.Mappings.Vehicle;
using VehicleInventory.DBManager.Models.DTOs;
using VehicleInventory.DBManager.Models.Entities;
using VehicleInventory.DBManager.Repositories;

namespace VehicleInventory.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository _vehicleRepository;

        

        public VehicleService(IVehicleRepository vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public async Task<List<VehicleDto>> GetAllVehicles()
        {
            var vehicles = await _vehicleRepository.GetAllVehicles();
            return vehicles.ToVehicleDtoList();
        }

        public async Task<VehicleDto> GetVehicleById(int id)
        {
            var vehicle = await CheckVehicleExist(id);
            return vehicle.ToVehicleDto();
        }

        public async Task<List<VehicleDto>> SearchVehicles(VehicleSearchModelDto vehicleSearchModel)
        {
            var vehicleSearchCriteria = vehicleSearchModel.ToVehicleSearchCriteria();
            var vehicles = await _vehicleRepository.SearchVehicles(vehicleSearchCriteria);
            return vehicles.ToVehicleDtoList();
        }

        public async Task<VehicleDto> CreateVehicle(CreateVehicleDto vehicleDto)
        {
            await EnsureLicensePlateIsUnique(vehicleDto.LicensePlate);

            await CheckAssigningToActiveVehicle(vehicleDto.Status, vehicleDto.DriverId);

            var vehicle = vehicleDto.ToVehicleEntity();

            await _vehicleRepository.AddVehicle(vehicle);
            await _vehicleRepository.SaveChanges();
            return vehicle.ToVehicleDto();
        }

        public async Task<VehicleDto> UpdateVehicle(int id, UpdateVehicleDto vehicleDto)
        {
            var vehicle = await CheckVehicleExist(id);
            await EnsureLicensePlateIsUnique(vehicleDto.LicensePlate, id);

            await CheckAssigningToActiveVehicle(vehicleDto.Status, vehicleDto.DriverId);

            vehicleDto.ApplyToVehicleEntity(vehicle);
            vehicle.UpdatedAt = DateTime.Now;

            _vehicleRepository.UpdateVehicle(vehicle);
            await _vehicleRepository.SaveChanges();

            return vehicle.ToVehicleDto();
        }

        public async Task DeleteVehicle(int id)
        {
            var vehicle = await CheckVehicleExist(id);
            _vehicleRepository.RemoveVehicle(vehicle);
            await _vehicleRepository.SaveChanges();
        }

        public async Task<bool> DriverHasVehicles(int driverId)
        {
            return await _vehicleRepository.DriverHasVehicles(driverId);
        }

        private async Task<VehicleEntity> CheckVehicleExist(int id)
        {
            var vehicle = await _vehicleRepository.GetVehicleById(id);
            if (vehicle is null)
                throw new NotFoundException($"Vehicle with id {id} was not found.");

            return vehicle;
        }

        private async Task EnsureLicensePlateIsUnique(string licensePlate, int? excludeId = null)
        {
            var exists = await _vehicleRepository.VehicleLicensePlateExists(licensePlate, excludeId);
            if (exists)
                throw new ConflictException($"A vehicle with license plate '{licensePlate}' already exists.");
        }

        private async Task CheckAssigningToActiveVehicle(VehicleStatus status, int? id)
        {
            bool vehicleIsActive = status == VehicleStatus.Active;
            if (!vehicleIsActive && id != null)
                throw new ConflictException($"Can't assign a driver to a vehicle that is not active.");
        }
    }
}
