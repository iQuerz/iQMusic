using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebDevProj.Models;

namespace WebDevProj
{
    public class iQMusicContext : DbContext
    {
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Song> Songs { get; set; }
        public DbSet<FeatureLink> Links { get; set; }

        public iQMusicContext(DbContextOptions options)
            :base(options)
        {

        }
    }
}
