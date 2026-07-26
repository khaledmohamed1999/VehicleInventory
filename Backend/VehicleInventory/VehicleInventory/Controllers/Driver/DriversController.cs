using Microsoft.AspNetCore.Mvc;
using VehicleInventory.Services;
using VehicleInventory.DBManager.Models.DTOs;
using VehicleInventory.DBManager.Models.Entities;

namespace VehicleInventory.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class DriversController : ControllerBase
    {
        private readonly IDriverService _driverService;

        public DriversController(IDriverService driverService)
        {
            _driverService = driverService;
        }

        [HttpGet]
        public async Task<ActionResult<List<DriverDto>>> GetAllDrivers()
        {
            var drivers = await _driverService.GetAllDrivers();
            return Ok(drivers);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<DriverDto>> GetDriverById(int id)
        {
            var driver = await _driverService.GetDriverById(id);
            return Ok(driver);
        }

        [HttpPost]
        public async Task<ActionResult<List<DriverDto>>> SearchDrivers([FromBody] DriverSearchModelDto driverSearchModel)
        {
            var drivers = await _driverService.SearchDrivers(driverSearchModel);
            return Ok(drivers);
        }

        [HttpPost]
        public async Task<ActionResult<DriverDto>> CreateDriver([FromBody] CreateDriverDto driverDto)
        {
            var createdDriver = await _driverService.CreateDriver(driverDto);
            return CreatedAtAction(nameof(GetDriverById), new { id = createdDriver.Id }, createdDriver);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<DriverDto>> UpdateDriver(int id, [FromBody] UpdateDriverDto driverDto)
        {
            var updatedDriver = await _driverService.UpdateDriver(id, driverDto);
            return Ok(updatedDriver);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteDriver(int id)
        {
            await _driverService.DeleteDriver(id);
            return NoContent();
        }
    }
}
