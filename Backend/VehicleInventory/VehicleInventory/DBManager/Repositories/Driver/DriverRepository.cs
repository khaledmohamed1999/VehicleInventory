using Microsoft.EntityFrameworkCore;
using VehicleInventory.DBManager.Models.Entities;
using VehicleInventory.DBManager.Context;

namespace VehicleInventory.DBManager.Repositories
{
    public class DriverRepository : IDriverRepository
    {
        private readonly VehicleInventoryContext _context;

        public DriverRepository(VehicleInventoryContext context)
        {
            _context = context;
        }

        public async Task<List<DriverEntity>> GetAllDrivers()
        {
            return await _context.Drivers.AsNoTracking().ToListAsync();
        }

        public async Task<DriverEntity?> GetDriverById(int id)
        {
            return await _context.Drivers.FindAsync(id);
        }

        public async Task<List<DriverEntity>> SearchDrivers(DriverSearchCriteria driverSearchCriteria)
        {
            var driverSearchQuery = _context.Drivers.AsQueryable();

            if (!string.IsNullOrEmpty(driverSearchCriteria.Name))
                driverSearchQuery =driverSearchQuery.Where(x => x.Name.StartsWith(driverSearchCriteria.Name));

            if (driverSearchCriteria.Level.HasValue)
                driverSearchQuery = driverSearchQuery.Where(x => x.Level == driverSearchCriteria.Level);

            return await driverSearchQuery.ToListAsync();
        }

        public async Task AddDriver(DriverEntity Driver)
        {
            await _context.Drivers.AddAsync(Driver);
        }

        public void UpdateDriver(DriverEntity Driver)
        {
            _context.Drivers.Update(Driver);
        }

        public void RemoveDriver(DriverEntity Driver)
        {
            _context.Drivers.Remove(Driver);
        }

        public async Task<bool> SaveChanges()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
