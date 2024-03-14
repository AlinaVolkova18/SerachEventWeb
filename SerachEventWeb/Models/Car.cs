using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SerachEventWeb
{
    public partial class Car
    {
        public Car()
        {
            Schedules = new HashSet<Schedule>();
        }
        [Key]
        public int Id { get; set; }
        public int Model_id { get; set; }
        public int Color_id { get; set; }
        [Required]
        public string Number { get; set; }

        public virtual Model Model { get; set; }
        public virtual Color Color { get; set; }
        public virtual ICollection<Schedule> Schedules { get; set; }
    }
}
