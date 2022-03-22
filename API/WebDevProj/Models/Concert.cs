using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebDevProj.Models
{
    public class Concert
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MinLength(6)]
        public string Name { get; set; }

        [Required]
        [Url]
        public string Image { get; set; }

        [Required]
        public string Date { get; set; }

        [Required]
        [Url]
        public string Url { get; set; }
    }
}
