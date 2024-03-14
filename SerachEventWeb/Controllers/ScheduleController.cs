
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerachEventWeb
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly TaxiOrderContext _context;

        public ScheduleController(TaxiOrderContext context)
        {
            _context = context;
        }


        #region GET
        [HttpGet]
        public IEnumerable<Schedule> GetSchedule()
        {
            return _context.Schedules.Include(p => p.Orders).ThenInclude(c => c.Kind).Include(b => b.Driver).Include(a => a.Car).ThenInclude( s=> s.Model).Include(a => a.Car).ThenInclude(s => s.Color);
        }
        #endregion


        #region GET по id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSchedule([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var schedule = await _context.Schedules.Include(p => p.Orders).Include(a => a.Car).Include(b => b.Driver).SingleOrDefaultAsync(m => m.Id == id);

            if (schedule == null)
            {
                return NotFound();
            }

            return Ok(schedule);
        }
        #endregion


        #region POST
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Schedule schedule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Schedules.Add(schedule);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSchedule", new { id = schedule.Id }, schedule);
        }
        #endregion


        #region PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Schedule schedule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Schedules.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            item.Date = schedule.Date;
            item.Car_id = schedule.Car_id;
            item.Driver_id = schedule.Driver_id;
            _context.Schedules.Update(item);
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
            var item2 = _context.Orders.Where(p => p.Schedule_id == id).ToList();
            var item = _context.Schedules.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            for (int i = 0; i < item2.Count; i++)
            {
                _context.Orders.Remove(item2[i]);
            }

            _context.Schedules.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        #endregion
    }
}
