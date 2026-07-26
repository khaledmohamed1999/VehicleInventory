using System.ComponentModel.DataAnnotations;

namespace VehicleInventory.DBManager.Models.Entities
{
    public class VehicleSearchCriteria
    {
        public string? LicensePlate { get; set; }

        public int? DriverId { get; set; }

        public string? Model { get; set; }

        public int? Year { get; set; }

        public VehicleType? Type { get; set; }

        public VehicleStatus? Status { get; set; }
    }
}
