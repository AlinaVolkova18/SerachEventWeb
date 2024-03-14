
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerachEventWeb
{
    [Route("api/[controller]")]
    [ApiController]
    public class KindController : ControllerBase
    {
        private readonly TaxiOrderContext _context;

        public KindController(TaxiOrderContext context)
        {
            _context = context;
            //if (_context.Sessions.Count() == 0)
            //{
            //    _context.Sessions.Add(new Kind { EventsOrganizersId = 1 });
            //    _context.SaveChanges();
            //}
        }


        #region GET
        [HttpGet]
        public IEnumerable<Kind> GetAll()
        {
            return _context.Kinds.Include(p => p.Orders);
        }
        #endregion


        #region GET по id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetKind([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var kind = await _context.Kinds.SingleOrDefaultAsync(m => m.Id == id);

            if (kind == null)
            {
                return NotFound();
            }

            return Ok(kind);
        }
        #endregion


        #region POST
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Kind kind)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Kinds.Add(kind);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetKind", new { id = kind.Id }, kind);
        }
        #endregion


        #region PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Kind kind)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Kinds.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            item.Name = kind.Name;
            _context.Kinds.Update(item);
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
            var item = _context.Kinds.Find(id);

            if (item == null)
            {
                return NotFound();
            }

            _context.Kinds.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        #endregion

    }
}
