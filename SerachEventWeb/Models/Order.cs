using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SerachEventWeb
{
    public partial class Order
    {
        [Key]
        public int Id { get; set; }
        public int Schedule_id { get; set; }
        public int Kind_id { get; set; }
        [Required]
        public string PickUp { get; set; }
        public string Destination { get; set; }
        public decimal Cost { get; set; }

        public virtual Schedule Schedule { get; set; }
        public virtual Kind Kind { get; set; }
    }
}
