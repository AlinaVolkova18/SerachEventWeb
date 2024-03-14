using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerachEventWeb.Data
{
    public static class DbInitializer
    {
        public static void Initialize(TaxiOrderContext context)
        {
            context.Database.EnsureCreated();

            if (context.Cars.Any() && context.Colors.Any() && context.Models.Any() &&
                context.Drivers.Any() && context.Kinds.Any() && context.Orders.Any() && context.Schedules.Any())
            {
                return;
            }

            var orders = new Order[]
            {
                new Order { PickUp = "Веселова, 41", Destination = "3-я Балинская. 2А", Cost = 193, Schedule_id = 2},
                new Order { PickUp = "8-я Завокзальная, 15", Destination = "Печатная. 38", Cost = 177, Schedule_id = 2},
                new Order { PickUp = "Герцена, 14/4", Destination = "Ермака, 60", Cost = 203, Schedule_id = 2},
                new Order { PickUp = "Багаева, 6А", Destination = "Жарова, 55А", Cost = 185, Schedule_id = 2},
                new Order { PickUp = "Кавалерийская, 7", Destination = "4-я Вишневая, 10", Cost = 272, Schedule_id = 2},
            };
            foreach (Order b in orders)
            {
                context.Orders.Add(b);
            }
            context.SaveChanges();

            var cars = new Car[]
            {
                new Car { Number = "Х 200 ЕО", Model_id = 2, Color_id = 2},
                new Car { Number = "М 002 МТ", Model_id = 5, Color_id = 2},
                new Car { Number = "В 037 КМ", Model_id = 3, Color_id = 2},
                new Car { Number = "О 838 ОА", Model_id = 1, Color_id = 2},
                new Car { Number = "А 099 УЕ", Model_id = 4, Color_id = 2},
            };
            foreach (Car b in cars)
            {
                context.Cars.Add(b);
            }
            context.SaveChanges();
        }

    }
}

