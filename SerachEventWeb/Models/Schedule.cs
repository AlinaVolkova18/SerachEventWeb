using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SerachEventWeb
{
    public partial class Schedule
    {
        public Schedule()
        {
            Orders = new HashSet<Order>();
        }
        [Key]
        public int Id { get; set; }
        public int Car_id { get; set; }
        public int Driver_id { get; set; }
        [Required]
        public DateTime Date { get; set; }

        public virtual Car Car { get; set; }
        public virtual Driver Driver { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
