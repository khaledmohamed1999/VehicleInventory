using VehicleInventory.DBManager.Models.Entities;

namespace VehicleInventory.DBManager.Models.DTOs
{
    public class VehicleDto
    {
        public int Id { get; set; }
        public string LicensePlate { get; set; } = string.Empty;
        public string? Model { get; set; }
        public int Year { get; set; }
        public VehicleType Type { get; set; }
        public VehicleStatus Status { get; set; }
        public int Mileage { get; set; }
        public DriverDto? AssignedDriver { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
