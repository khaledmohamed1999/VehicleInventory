using System.ComponentModel.DataAnnotations;
using VehicleInventory.DBManager.Models.Entities;

namespace VehicleInventory.DBManager.Models.DTOs
{
    public class UpdateDriverDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Phone { get; set; } = string.Empty;

        public DateTime? DOB { get; set; }

        public DriverLevel Level { get; set; } = DriverLevel.Beginner;
    }
}
