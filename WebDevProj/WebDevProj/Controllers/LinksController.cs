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
    public class LinksController : ControllerBase
    {
        public iQMusicContext Context { get; set; }
        public LinksController(iQMusicContext context)
        {
            Context = context;
        }

        [HttpGet]
        [Route("{songID}")]
        public async Task<ActionResult> GetSongFeatures(int songID)
        {
            if (songID <= 0)
                return BadRequest($"ID Values are strictly positive. {songID} is not a valid ID.");

            var links = await Task.Run(() => 
                Context.Links.Where(l => l.SongID == songID).ToList());

            return Ok(links);
        }

        [HttpPost]
        [Route("{songID}/{artistID}")]
        public async Task<ActionResult> AddFeature(int songID, int artistID)
        {
            if (songID <= 0)
                return BadRequest($"ID Values are strictly positive. {songID} is not a valid ID.");
            if (artistID <= 0)
                return BadRequest($"ID Values are strictly positive. {artistID} is not a valid ID.");

            var artist = await Context.Artists.FindAsync(artistID);
            if (artist == null)
                return NotFound($"Could not find the related artist. Try with a different ID.");

            var song = await Context.Songs.FindAsync(songID);
            if (song == null)
                return NotFound($"Could not find the related song. Try with a different ID.");

            FeatureLink link = new()
            {
                SongID = songID,
                ArtistID = artistID
            };

            Context.Links.Add(link);
            await Context.SaveChangesAsync();

            return Ok(link);
        }

        [HttpDelete]
        [Route("{songID}/{artistID}")]
        public async Task<ActionResult> DeleteFeature(int songID, int artistID)
        {
            if(songID <= 0)
                return BadRequest($"ID Values are strictly positive. '{songID}' is not a valid ID.");
            
            var link = Context.Links.Where(l => l.SongID == songID && l.ArtistID == artistID).FirstOrDefault();
            if (link == null)
                return NotFound("The object you are trying to access does not exist. Try with a different ID.");

            Context.Links.Remove(link);
            await Context.SaveChangesAsync();
            return Ok("Entity removed succesfully.");
        }
    }
}
