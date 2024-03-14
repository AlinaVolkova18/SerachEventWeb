
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerachEventWeb
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase
    {
        private readonly TaxiOrderContext _context;

        public DriverController(TaxiOrderContext context)
        {
            _context = context;
            //if (_context.Events.Count() == 0)
            //{
            //    _context.Events.Add(new Driver
            //    {
            //        Title = "No Name",
            //        Description = "Что-то о фильме No Name",
            //        Site = "https://metanit.com/sharp/entityframeworkcore/1.3.php",
            //        TypeId = 3,
            //        CategoryId = 2,
            //        AgeId = 1
            //    });
            //    _context.SaveChanges();
            //}
        }


        #region GET
        [HttpGet]
        public IEnumerable<Driver> GetAll()
        {
            return _context.Drivers.Include(a => a.Schedules);
        }
        #endregion


        #region GET по id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDriver([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var driver = await _context.Drivers.SingleOrDefaultAsync(m => m.Id == id);
            if (driver == null)
            {
                return NotFound();
            }

            return Ok(driver);
        }
        #endregion


        #region POST
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Driver driver)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Drivers.Add(driver);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDriver", new { id = driver.Id }, driver);
        }
        #endregion


        #region PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Driver driver)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Drivers.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            item.FullName = driver.FullName;
            item.Phone = driver.Phone;
            item.Passport = driver.Passport;
            item.Status = driver.Status;
            _context.Drivers.Update(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        #endregion


        #region DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Drivers.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Drivers.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        #endregion
    }
}
