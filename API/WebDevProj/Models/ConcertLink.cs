using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebDevProj.Models
{
    public class ConcertLink
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public int ArtistID { get; set; }
        [Required]
        public int ConcertID { get; set; }
    }
}
