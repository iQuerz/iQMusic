using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebDevProj.Models
{
    public class Album : BaseEntity
    {
        [Required]
        [MinLength(1)]
        public string Name { get; set; }

        [Required]
        [MinLength(2)]
        public string Genre { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]
        [Url]
        public string Image { get; set; }

        [Required]
        public int ArtistID { get; set; }
    }
}
