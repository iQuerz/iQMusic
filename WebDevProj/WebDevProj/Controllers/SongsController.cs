using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebDevProj.Models;

namespace WebDevProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        public iQMusicContext Context { get; set; }
        public SongsController(iQMusicContext context)
        {
            Context = context;
        }

        [HttpGet]
        [Route("{AlbumID}")]
        public async Task<ActionResult> GetAlbumSongs(int AlbumID)
        {
            var album = await Context.Albums.FindAsync(AlbumID);

            if (album == null)
                return NotFound($"Could not find the related album. Try with a different ID.");

            var songs = Context.Songs.Where(s => s.AlbumID == AlbumID)
                .Select(s => new
                {
                    Song = s,
                    Features = Context.Links.Where(l => l.SongID == s.ID)
                        .Select(l => new
                        {
                            Artist = Context.Artists.Where(a => a.ID == l.ArtistID)
                                .Select(a => new
                                {
                                    Name = a.Name
                                }).FirstOrDefault()
                        }).ToList()
                });

            return Ok(songs);
        }

        [HttpPost]
        public async Task<ActionResult> AddSong([FromBody] Song song)
        {
            var album = await Context.Albums.FindAsync(song.AlbumID);

            if (album == null)
                return NotFound($"Could not find the related album. Try with a different ID.");

            Context.Songs.Add(song);
            await Context.SaveChangesAsync();

            return Ok(song);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> UpdateSong([FromBody] Song song, int id)
        {
            if (id <= 0)
                return BadRequest($"ID Values are strictly positive. {id} is not a valid ID.");

            var s = await Context.Songs.FindAsync(id);

            if (s == null)
                return NotFound($"The object you are trying to access does not exist. Try with a different ID.");

            s = song;
            await Context.SaveChangesAsync();
            return Ok(s);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> DeleteSong(int id)
        {
            if (id <= 0)
                return BadRequest($"ID Values are strictly positive. {id} is not a valid ID.");

            var s = await Context.Songs.FindAsync(id);

            if (s == null)
                return NotFound($"The object you are trying to access does not exist. Try with a different ID.");

            Context.Songs.Remove(s);
            await Context.SaveChangesAsync();
            return Ok("Entity removed succesfully.");
        }
    }
}
