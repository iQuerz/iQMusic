using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebDevProj.Models.Types;

namespace WebDevProj.Models
{
    public class Artist : BaseEntity
    {
        [Required]
        [MinLength(1)]
        public string Name { get; set; }

        [Required]
        [MinLength(10)]
        public string Description { get; set; }

        [Required]
        public ArtistType ArtistType { get; set; }

        [Required]
        public string StartDate { get; set; }

        public string EndDate { get; set; }

        [Url]
        public string Image { get; set; }
    }
}
