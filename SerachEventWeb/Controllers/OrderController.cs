
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerachEventWeb
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly TaxiOrderContext _context;

        public OrderController(TaxiOrderContext context)
        {
            _context = context;
            //if (_context.Organizers.Count() == 0)
            //{
            //    _context.Organizers.Add(new Order
            //    {
            //        Name = "No Name Two",
            //        Site = "https://stackoverflow.com/questions/58006152/net-core-3-not-having-referenceloophandling-in-addjsonoptions",
            //        PlaceId = 2
            //    });
            //    _context.SaveChanges();
            //}
        }


        #region GET
        [HttpGet]
        public IEnumerable<Order> GetAll()
        {
            return _context.Orders.Include(a => a.Kind).Include(p => p.Schedule).ThenInclude(s => s.Car).Include(p => p.Schedule).ThenInclude(s => s.Driver);
        }
        #endregion


        #region GET по id 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var order = await _context.Orders.Include(a => a.Kind).Include(p => p.Schedule).ThenInclude(s => s.Car).Include(p => p.Schedule).ThenInclude(s => s.Driver).SingleOrDefaultAsync(m => m.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }
        #endregion


        #region POST
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }
        #endregion


        #region PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Orders.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            item.PickUp = order.PickUp;
            item.Destination = order.Destination;
            item.Cost = order.Cost;
            item.Schedule_id = order.Schedule_id;
            item.Kind_id = order.Kind_id;

            _context.Orders.Update(item);
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

            var item = _context.Orders.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        #endregion
    }
}
