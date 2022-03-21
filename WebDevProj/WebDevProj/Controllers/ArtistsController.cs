using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebDevProj.Models;

namespace WebDevProj.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArtistsController : ControllerBase
    {
        public iQMusicContext Context { get; set; }
        public ArtistsController(iQMusicContext context)
        {
            Context = context;
        }

        [HttpGet]
        [Route("{ArtistID}")]
        public async Task<ActionResult> GetArtist(int ArtistID)
        {
            if (ArtistID <= 0)
            {
                return BadRequest();
            }

            var artist = await Context.Artists.FindAsync(ArtistID);

            if (artist == null)
                return BadRequest();

            return Ok(artist);
        }

        [HttpGet]
        [Route("page/{page}")]
        public async Task<ActionResult> GetArtistsPage(int page = 1)
        {
            if (page < 1)
                return BadRequest();

            const int itemsPerPage = 20;
            int skip = (page - 1) * itemsPerPage;
            int count = Context.Artists.Count();

            if (skip >= count)
                skip = count / 20;
            
            var artists = Context.Artists.Skip(skip).Take(itemsPerPage);
            
            return Ok(artists);
        }

        [HttpPost]
        public async Task<ActionResult> CreateArtist([FromBody] Artist artist)
        {
            if (artist.ID != 0)
                return BadRequest(); //create se bez id

            var test = Context.Artists.Where(a => a.Name.ToLower() == artist.Name.ToLower()).FirstOrDefault();
            if (test != null)
                return BadRequest(); //vec postoji

            Context.Artists.Add(artist);
            await Context.SaveChangesAsync();
            return Ok(artist);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> UpdateArtist([FromBody] Artist artist, int id)
        {
            var a = await Context.Artists.FindAsync(artist.ID);
            if (a == null)
                return BadRequest(); //ne postoji

            if (a.Name != artist.Name)
            {
                var test = Context.Artists.Where(x => x.Name.ToLower() == artist.Name.ToLower()).FirstOrDefault();
                if (test != null)
                    return BadRequest(); //ime vec postoji
            }

            a = artist;
            await Context.SaveChangesAsync();

            return Ok(artist);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> DeleteArtist(int id)
        {
            if (id <= 0)
                return BadRequest(); //nemoz bude <0

            var artist = await Context.Artists.FindAsync(id);

            if (artist == null)
                return BadRequest(); //ne postoji

            Context.Artists.Remove(artist);
            return Ok("Entity removed succesfully.");
        }
    }
}
