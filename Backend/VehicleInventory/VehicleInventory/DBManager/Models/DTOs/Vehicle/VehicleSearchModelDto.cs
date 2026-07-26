using System.ComponentModel.DataAnnotations;
using VehicleInventory.DBManager.Models.Entities;

namespace VehicleInventory.DBManager.Models.DTOs
{
    public class VehicleSearchModelDto
    {
        public string? LicensePlate { get; set; }

        public int? DriverId { get; set; }

        public string? Model { get; set; }

        [Range(1980, 2100)]
        public int? Year { get; set; }

        public VehicleType? Type { get; set; }

        public VehicleStatus? Status { get; set; }
    }
}
