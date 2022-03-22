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

            var songs = Context.Songs.Where(s => s.AlbumID == AlbumID);

            return Ok(songs);
        }

        [HttpPost]
        public async Task<ActionResult> AddSong([FromBody] Song song)
        {
            if (song.ID != 0)
                return BadRequest("ID not 0. ID needs to be 0 for auto-increment.");

            var album = await Context.Albums.FindAsync(song.AlbumID);

            if (album == null)
                return NotFound($"Could not find the related album. Try with a different ID.");

            try
            {
                Context.Songs.Add(song);
                await Context.SaveChangesAsync();

                return Ok(song);
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> UpdateSong([FromBody] Song song, int id)
        {
            if (id <= 0)
                return BadRequest($"ID Values are strictly positive. {id} is not a valid ID.");

            var s = await Context.Songs.FindAsync(id);

            if (s == null)
                return NotFound($"Could not find the related song. Try with a different ID.");

            s.Title = song.Title;
            s.Youtube = song.Youtube;
            s.Spotify = song.Spotify;
            s.AlbumID = song.AlbumID;
            await Context.SaveChangesAsync();
            return Ok(s);
        }

        [HttpDelete]
        [Route("{songID}")]
        public async Task<ActionResult> DeleteSong(int songID)
        {
            if (songID <= 0)
                return BadRequest($"ID Values are strictly positive. {songID} is not a valid ID.");

            var s = await Context.Songs.FindAsync(songID);

            if (s == null)
                return NotFound($"Could not find the related song. Try with a different ID.");

            try
            {
                Context.Songs.Remove(s);
                await Context.SaveChangesAsync();
                return Ok("Entity removed succesfully.");
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
