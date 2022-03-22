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
        [Route("{artistID}")]
        public async Task<ActionResult> GetArtist(int artistID)
        {
            if (artistID <= 0)
                return BadRequest($"ID Values are strictly positive. {artistID} is not a valid ID.");

            try
            {
                var artist = await Context.Artists.FindAsync(artistID);

                if (artist == null)
                    return NotFound("Could not find the related artist. Try with a different ID.");

                return Ok(artist);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Route("page/{page}")]
        public async Task<ActionResult> GetArtistsPage(int page = 1)
        {
            try
            {
                if (page < 1)
                    page = 1;

                const int itemsPerPage = 20;
                int skip = (page - 1) * itemsPerPage;
                int count = Context.Artists.Count();

                if (skip >= count)
                    skip = count / 20;

                var artists = Context.Artists.OrderBy(a => a.Name).Skip(skip).Take(itemsPerPage);

                return Ok(artists);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Route("Name/{name}")]
        public async Task<ActionResult> GetArtistByName(string name)
        {
            var artist = Context.Artists.Where(a => a.Name == name).FirstOrDefault();
            if (artist == null)
                return NotFound("Could not find the related artist. Try with a different ID.");
            return Ok(artist);
        }

        [HttpPost]
        public async Task<ActionResult> CreateArtist([FromBody] Artist artist)
        {
            if (artist.ID != 0)
                return BadRequest("ID not 0. ID needs to be 0 for auto-increment.");

            try
            {
                var test = Context.Artists.Where(a => a.Name.ToLower() == artist.Name.ToLower()).FirstOrDefault();
                if (test != null)
                    return BadRequest("The artist you're trying to create already exists.");

                Context.Artists.Add(artist);
                await Context.SaveChangesAsync();
                return Ok(artist);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut]
        [Route("{artistID}")]
        public async Task<ActionResult> UpdateArtist([FromBody] Artist artist, int artistID)
        {
            if (artist.ID != artistID)
                return BadRequest("Endpoint ID and object ID are not equal.");

            if(artistID <= 0)
                return BadRequest($"ID Values are strictly positive. {artistID} is not a valid ID.");

            try
            {
                var a = await Context.Artists.FindAsync(artistID);
                if (a == null)
                    return NotFound("Could not find the related artist. Try with a different ID.");

                if (a.Name != artist.Name)
                {
                    var test = Context.Artists.Where(x => x.Name.ToLower() == artist.Name.ToLower()).FirstOrDefault();
                    if (test != null)
                        return BadRequest("Cannot update. An artist with the same name already exists.");
                }

                a.Name = artist.Name;
                a.Image = artist.Image;
                a.Spotify = artist.Spotify;
                a.Youtube = artist.Youtube;
                a.StartDate = artist.StartDate;
                a.EndDate = artist.EndDate;
                a.Description = artist.Description;
                a.ArtistType = artist.ArtistType;
                await Context.SaveChangesAsync();
                return Ok(a);
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete]
        [Route("{artistID}")]
        public async Task<ActionResult> DeleteArtist(int artistID)
        {
            if (artistID <= 0)
                return BadRequest($"ID Values are strictly positive. {artistID} is not a valid ID.");

            try
            {
                var artist = await Context.Artists.FindAsync(artistID);

                if (artist == null)
                    return NotFound("Could not find the related artist. Try with a different ID.");

                var albums = Context.Albums.Where(a => a.ArtistID == artist.ID);
                if (albums.Count() > 0)
                {
                    foreach (var album in albums)
                    {
                        var songs = Context.Songs.Where(s => s.AlbumID == album.ID);
                        if (songs.Count() > 0)
                            Context.Songs.RemoveRange(songs);
                    }
                    Context.Albums.RemoveRange(albums);
                }
                Context.Artists.Remove(artist);

                await Context.SaveChangesAsync();
                return Ok("Entity removed succesfully.");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
