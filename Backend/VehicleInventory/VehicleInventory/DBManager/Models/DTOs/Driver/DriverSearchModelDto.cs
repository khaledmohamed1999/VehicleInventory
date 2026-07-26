using VehicleInventory.DBManager.Models.Entities;

namespace VehicleInventory.DBManager.Models.DTOs
{
    public class DriverSearchModelDto
    {
        public string? Name { get; set; }

        public DriverLevel? Level { get; set; }
    }
}
