using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebDevProj.Models
{
    public class BaseEntity
    {
        [Key]
        public int ID { get; set; }

        [Url]
        public string Youtube { get; set; }

        [Url]
        public string Spotify { get; set; }
    }
}
