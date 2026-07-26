using System.ComponentModel.DataAnnotations;
using VehicleInventory.DBManager.Models.Entities;

namespace VehicleInventory.DBManager.Models.DTOs
{
    public class UpdateVehicleDto
    {
        [Required, MaxLength(20)]
        public string LicensePlate { get; set; } = string.Empty;

        public int? DriverId { get; set; }

        public string? Model { get; set; } = string.Empty;

        [Range(1980, 2100)]
        public int? Year { get; set; }

        public VehicleType Type { get; set; }

        public VehicleStatus Status { get; set; } = VehicleStatus.Active;

        [Range(0, int.MaxValue)]
        public int Mileage { get; set; } = 0;
    }
}
