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
                return BadRequest(); //stranica su prirodni brojevi

            const int itemsPerPage = 20;
            int skip = (page - 1) * itemsPerPage;
            int count = Context.Artists.Count();

            if (skip >= count)
                skip = count / 20;
            
            var artists = Context.Artists.OrderBy(a => a.Name).Skip(skip).Take(itemsPerPage);
            
            return Ok(artists);
        }

        [HttpGet]
        [Route("Name/{name}")]
        public async Task<ActionResult> GetArtistByName(string name)
        {
            var artist = Context.Artists.Where(a => a.Name == name).FirstOrDefault();
            return Ok(artist);
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
            if (artist.ID != id)
                return BadRequest(); //url & object don't match

            var a = await Context.Artists.FindAsync(id);
            if (a == null)
                return BadRequest(); //ne postoji

            if (a.Name != artist.Name)
            {
                var test = Context.Artists.Where(x => x.Name.ToLower() == artist.Name.ToLower()).FirstOrDefault();
                if (test != null)
                    return BadRequest(); //ime vec postoji
            }
            try
            {
                a.Name = artist.Name;
                a.Image = artist.Image;
                a.Spotify = artist.Spotify;
                a.Youtube = artist.Youtube;
                a.StartDate = artist.StartDate;
                a.EndDate = artist.EndDate;
                a.Description = artist.Description;
                a.ArtistType = artist.ArtistType;
                await Context.SaveChangesAsync();
            }
            catch(Exception e)
            {
                return StatusCode(500, "Server error.\n" + e.Message);
            }

            return Ok(a);
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

            var albums = Context.Albums.Where(a => a.ArtistID == artist.ID);

            foreach(var album in albums)
            {
                var songs = Context.Songs.Where(s => s.AlbumID == album.ID);
                Context.Songs.RemoveRange(songs);
            }
            Context.Albums.RemoveRange(albums);

            Context.Artists.Remove(artist);
            await Context.SaveChangesAsync();
            return Ok("Entity removed succesfully.");
        }
    }
}
