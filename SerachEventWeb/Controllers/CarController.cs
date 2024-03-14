
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerachEventWeb
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly TaxiOrderContext _context;

        public CarController(TaxiOrderContext context)
        {
            _context = context;
            //if (_context.Ages.Count() == 0)
            //{
            //    _context.Ages.Add(new Car { Age1 = 21 });
            //    _context.SaveChanges();
            //}
        }


        #region GET
        [HttpGet]
        public IEnumerable<Car> GetAll()
        {
            return _context.Cars.Include(p => p.Model).Include(a => a.Color).Include(b => b.Schedules).ThenInclude(c => c.Driver).Include(b => b.Schedules).ThenInclude(c => c.Orders);
        }
        #endregion


        #region GET по id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCar([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var car = await _context.Cars.Include(p => p.Model).Include(a => a.Color).Include(b => b.Schedules).ThenInclude(c => c.Driver).Include(b => b.Schedules).ThenInclude(c => c.Orders).SingleOrDefaultAsync(m => m.Id == id);

            if (car == null)
            {
                return NotFound();
            }

            return Ok(car);
        }
        #endregion


        #region POST
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Car car)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCar", new { id = car.Id }, car);
        }
        #endregion


        #region PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Car car)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Cars.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            item.Number = car.Number;
            _context.Cars.Update(item);
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
            var item = _context.Cars.Find(id);
            var item2 = _context.Schedules.Where(p => p.Car_id == id).ToList();
            if (item == null)
            {
                return NotFound();
            }

            for (int i = 0; i < item2.Count; i++)
            {
                _context.Schedules.Remove(item2[i]);
                var item3 = _context.Orders.Where(p => p.Schedule_id == item2[i].Id).ToList();

                for (int j = 0; j < item3.Count; j++)
                {
                    _context.Orders.Remove(item3[j]);
                }

            }
            _context.Cars.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        #endregion
    }
}
