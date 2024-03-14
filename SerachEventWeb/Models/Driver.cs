using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SerachEventWeb
{
    public partial class Driver
    {
        public Driver()
        {
            Schedules = new HashSet<Schedule>();
        }
        [Key]
        public int Id { get; set; }
        [Required]
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Passport { get; set; }
        public string Status { get; set; }

        public virtual ICollection<Schedule> Schedules { get; set; }
    }
}
