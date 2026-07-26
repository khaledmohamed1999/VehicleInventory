using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VehicleInventory.Services;
using VehicleInventory.DBManager.Models.DTOs;
using VehicleInventory.DBManager.Models.Entities;

namespace VehicleInventory.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class VehiclesController : ControllerBase
    {
        private readonly IVehicleService _vehicleService;

        public VehiclesController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }

        [HttpGet]
        public async Task<ActionResult<List<VehicleDto>>> GetAllVehicles()
        {
            var vehicles = await _vehicleService.GetAllVehicles();
            return Ok(vehicles);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<VehicleDto>> GetVehicleById(int id)
        {
            var vehicle = await _vehicleService.GetVehicleById(id);
            return Ok(vehicle);
        }

        [HttpPost]
        public async Task<ActionResult<VehicleDto>> SearchVehicles([FromBody] VehicleSearchModelDto vehicleSearchModel)
        {
            var vehicles = await _vehicleService.SearchVehicles(vehicleSearchModel);
            return Ok(vehicles);
        }

        [HttpPost]
        public async Task<ActionResult<VehicleDto>> CreateVehicle([FromBody] CreateVehicleDto vehicleDto)
        {
            var createdVehicle = await _vehicleService.CreateVehicle(vehicleDto);
            return CreatedAtAction(nameof(GetVehicleById), new { id = createdVehicle.Id }, createdVehicle);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<VehicleDto>> UpdateVehicle(int id, [FromBody] UpdateVehicleDto vehicleDto)
        {
            var updatedVehicle = await _vehicleService.UpdateVehicle(id, vehicleDto);
            return Ok(updatedVehicle);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            await _vehicleService.DeleteVehicle(id);
            return NoContent();
        }
    }
}
