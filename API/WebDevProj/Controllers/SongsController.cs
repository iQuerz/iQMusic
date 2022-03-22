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
        [Route("{albumID}")]
        public async Task<ActionResult> GetAlbumSongs(int albumID)
        {
            if(albumID <= 0)
                return BadRequest($"ID Values are strictly positive. {albumID} is not a valid ID.");
            try
            {
                var album = await Context.Albums.FindAsync(albumID);

                if (album == null)
                    return NotFound($"Could not find the related album. Try with a different ID.");

                var songs = Context.Songs.Where(s => s.AlbumID == albumID);

                return Ok(songs);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddSong([FromBody] Song song)
        {
            if (song.ID != 0)
                return BadRequest("ID not 0. ID needs to be 0 for auto-increment.");

            try
            {
                var album = await Context.Albums.FindAsync(song.AlbumID);

                if (album == null)
                    return NotFound($"Could not find the related album. Try with a different ID.");

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
        [Route("{songID}")]
        public async Task<ActionResult> UpdateSong([FromBody] Song song, int songID)
        {
            if (song.ID != songID)
                return BadRequest("Endpoint ID and object ID are not equal.");

            if (songID <= 0)
                return BadRequest($"ID Values are strictly positive. {songID} is not a valid ID.");

            try
            {
                var s = await Context.Songs.FindAsync(songID);

                if (s == null)
                    return NotFound($"Could not find the related song. Try with a different ID.");

                s.Title = song.Title;
                s.Youtube = song.Youtube;
                s.Spotify = song.Spotify;
                s.AlbumID = song.AlbumID;
                await Context.SaveChangesAsync();
                return Ok(s);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete]
        [Route("{songID}")]
        public async Task<ActionResult> DeleteSong(int songID)
        {
            if (songID <= 0)
                return BadRequest($"ID Values are strictly positive. {songID} is not a valid ID.");

            try
            {
                var s = await Context.Songs.FindAsync(songID);
                if (s == null)
                    return NotFound($"Could not find the related song. Try with a different ID.");

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
