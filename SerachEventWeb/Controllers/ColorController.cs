﻿
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerachEventWeb
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        private readonly TaxiOrderContext _context;

        public ColorController(TaxiOrderContext context)
        {
            _context = context;
            //if (_context.Cities.Count() == 0)
            //{
            //    _context.Cities.Add(new Color { Name = "Красноярск" });
            //    _context.SaveChanges();
            //}
        }


        #region GET
        [HttpGet]
        public IEnumerable<Color> GetAll()
        {
            return _context.Colors.Include(p => p.Cars);
        }
        #endregion


        #region GET по id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetColor([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var color = await _context.Colors.SingleOrDefaultAsync(m => m.Id == id);

            if (color == null)
            {
                return NotFound();
            }

            return Ok(color);
        }
        #endregion


        #region POST
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Color color)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Colors.Add(color);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetColor", new { id = color.Id }, color);
        }
        #endregion


        #region PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Color color)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Colors.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            item.Name = color.Name;
            _context.Colors.Update(item);
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
            var item = _context.Colors.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Colors.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        #endregion
    }
}
