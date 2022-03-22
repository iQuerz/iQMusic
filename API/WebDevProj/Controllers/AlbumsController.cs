using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebDevProj.Models;

namespace WebDevProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumsController : ControllerBase
    {
        public iQMusicContext Context { get; set; }
        public AlbumsController(iQMusicContext context)
        {
            Context = context;
        }

        [HttpGet]
        [Route("{albumID}")]
        public async Task<ActionResult> GetAlbum(int albumID)
        {
            if (albumID <= 0)
                return BadRequest($"ID Values are strictly positive. {albumID} is not a valid ID.");

            try
            {
                var album = await Context.Albums.FindAsync(albumID);

                if (album == null)
                    return NotFound("Could not find the related album. Try with a different ID.");

                return Ok(album);
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Route("page/{page}")]
        public async Task<ActionResult> GetAlbumsPage(int page = 1)
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

                var albums = Context.Albums.OrderBy(a => a.Name).Skip(skip).Take(itemsPerPage);

                return Ok(albums);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Route("artist/{artistID}")]
        public async Task<ActionResult> GetArtistAlbums(int artistID)
        {
            if (artistID <= 0)
                return BadRequest($"ID Values are strictly positive. {artistID} is not a valid ID.");

            try
            {
                var albums = Context.Albums.Where(a => a.ArtistID == artistID);
                return Ok(albums);
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateAlbum([FromBody] Album album)
        {
            if (album.ID != 0)
                return BadRequest("ID not 0. ID needs to be 0 for auto-increment.");

            try
            {
                var test = Context.Albums.Where(a => a.Name.ToLower() == album.Name.ToLower()).FirstOrDefault();
                if (test != null)
                    return BadRequest("The album you're trying to create already exists.");

                Context.Albums.Add(album);
                await Context.SaveChangesAsync();
                return Ok(album);
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut]
        [Route("{albumID}")]
        public async Task<ActionResult> UpdateAlbum([FromBody] Album album, int albumID)
        {
            if (album.ID != albumID)
                return BadRequest("Endpoint ID and object ID are not equal.");

            if (albumID <= 0)
                return BadRequest($"ID Values are strictly positive. {albumID} is not a valid ID.");
            
            try
            {
                var a = await Context.Albums.FindAsync(albumID);
                if (a == null)
                    return NotFound($"Could not find the related album. Try with a different ID.");

                if (a.Name != album.Name)
                {
                    var test = Context.Albums.Where(x => x.Name.ToLower() == album.Name.ToLower()).FirstOrDefault();
                    if (test != null)
                        return BadRequest("Cannot update. An album with the same name already exists.");
                }

                a.Name = album.Name;
                a.Image = album.Image;
                a.Spotify = album.Spotify;
                a.Youtube = album.Youtube;
                a.Genre = album.Genre;
                a.Year = album.Year;
                a.ArtistID = album.ArtistID;
                await Context.SaveChangesAsync();
                return Ok(a);
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete]
        [Route("{albumID}")]
        public async Task<ActionResult> DeleteAlbum(int albumID)
        {
            if (albumID <= 0)
                return BadRequest($"ID Values are strictly positive. {albumID} is not a valid ID.");

            try
            {
                var album = await Context.Albums.FindAsync(albumID);
                if (album == null)
                    return NotFound($"Could not find the related album. Try with a different ID.");

                var songs = Context.Songs.Where(s => s.AlbumID == album.ID);
                if (songs.Count() > 0)
                    Context.Songs.RemoveRange(songs);

                Context.Albums.Remove(album);
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
