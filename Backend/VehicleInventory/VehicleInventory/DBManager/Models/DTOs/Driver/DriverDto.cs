using VehicleInventory.DBManager.Models.Entities;

namespace VehicleInventory.DBManager.Models.DTOs
{
    public class DriverDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string Phone { get; set; }
        public DateTime DOB { get; set; }
        public DriverLevel Level { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
