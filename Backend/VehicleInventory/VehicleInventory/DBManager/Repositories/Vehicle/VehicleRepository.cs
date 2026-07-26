using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using VehicleInventory.DBManager.Context;
using VehicleInventory.DBManager.Models.DTOs;
using VehicleInventory.DBManager.Models.Entities;

namespace VehicleInventory.DBManager.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VehicleInventoryContext _context;

        public VehicleRepository(VehicleInventoryContext context)
        {
            _context = context;
        }

        public async Task<List<VehicleEntity>> GetAllVehicles()
        {
            return await _context.Vehicles
                .Include(x => x.AssignedDriver)
                .AsNoTracking()
                .OrderBy(x => x.LicensePlate)
                .ToListAsync();
        }

        public async Task<VehicleEntity?> GetVehicleById(int id)
        {
            return await _context.Vehicles.Include(x => x.AssignedDriver).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<VehicleEntity>> SearchVehicles(VehicleSearchCriteria vehicleSearchCriteria)
        {
            var vehicleSearchQuery = _context.Vehicles.Include(x => x.AssignedDriver).AsQueryable();

            if (!string.IsNullOrEmpty(vehicleSearchCriteria.LicensePlate))
                vehicleSearchQuery = vehicleSearchQuery.Where(x => x.LicensePlate.StartsWith(vehicleSearchCriteria.LicensePlate));

            if (vehicleSearchCriteria.DriverId != null)
                vehicleSearchQuery = vehicleSearchQuery.Where(x => x.DriverId == vehicleSearchCriteria.DriverId);
            
            if (!string.IsNullOrEmpty(vehicleSearchCriteria.Model))
                vehicleSearchQuery = vehicleSearchQuery.Where(x => x.Model.StartsWith(vehicleSearchCriteria.Model));

            if (vehicleSearchCriteria.Year != null)
                vehicleSearchQuery = vehicleSearchQuery.Where(x => x.Year == vehicleSearchCriteria.Year);

            if (vehicleSearchCriteria.Type.HasValue)
                vehicleSearchQuery = vehicleSearchQuery.Where(x => x.Type == vehicleSearchCriteria.Type);

            if (vehicleSearchCriteria.Status.HasValue)
                vehicleSearchQuery = vehicleSearchQuery.Where(x => x.Status == vehicleSearchCriteria.Status);

            return await vehicleSearchQuery.ToListAsync();
        }

        public async Task<bool> DriverHasVehicles(int driverId)
        {
            return await _context.Vehicles.AnyAsync(x => x.DriverId == driverId);
        }

        public async Task<bool> VehicleLicensePlateExists(string licensePlate, int? excludeId = null)
        {
            return await _context.Vehicles
                .AnyAsync(x => x.LicensePlate == licensePlate && x.Id != excludeId);
        }

        public async Task AddVehicle(VehicleEntity vehicle)
        {
            await _context.Vehicles.AddAsync(vehicle);
        }

        public void UpdateVehicle(VehicleEntity vehicle)
        {
            _context.Vehicles.Update(vehicle);
        }

        public void RemoveVehicle(VehicleEntity vehicle)
        {
            _context.Vehicles.Remove(vehicle);
        }

        public async Task<bool> SaveChanges()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
