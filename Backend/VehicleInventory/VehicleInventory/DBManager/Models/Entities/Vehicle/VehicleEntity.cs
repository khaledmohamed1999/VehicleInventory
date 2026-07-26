namespace VehicleInventory.DBManager.Models.Entities
{
    public class VehicleEntity
    {
        public int Id { get; set; }
        public string LicensePlate { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public int Year { get; set; }
        public VehicleType Type { get; set; }
        public VehicleStatus Status { get; set; }
        public int Mileage { get; set; }
        public int? DriverId { get; set; }
        public DriverEntity? AssignedDriver { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
