using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebDevProj.Models
{
    public class Song : BaseEntity
    {
        [Required]
        [MinLength(1)]
        public string Title { get; set; }

        [Required]
        public int AlbumID { get; set; }
    }
}
