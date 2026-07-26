namespace VehicleInventory.DBManager.Models.Entities
{
    public class DriverEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime DOB { get; set; }
        public DriverLevel Level { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public ICollection<VehicleEntity> Vehicles { get; set; } = [];
    }
}
