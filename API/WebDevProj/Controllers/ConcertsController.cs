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
    public class ConcertsController : ControllerBase
    {
        public iQMusicContext Context { get; set; }
        public ConcertsController(iQMusicContext context)
        {
            Context = context;
        }

        [HttpGet]
        [Route("{artistID}")]
        public async Task<ActionResult> GetArtistConcerts(int artistID)
        {
            if(artistID <= 0)
                return BadRequest($"ID Values are strictly positive. {artistID} is not a valid ID.");

            try
            {
                var clinks = Context.CLinks.Where(l => l.ArtistID == artistID).ToList();
                List<Concert> concerts = new List<Concert>();
                foreach (var link in clinks)
                {
                    concerts.Add(Context.Concerts.Where(c => c.ID == link.ConcertID).FirstOrDefault());
                }
                return Ok(concerts);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpGet]
        [Route("{concertID}/Artists")]
        public async Task<ActionResult> GetConcertArtists(int concertID)
        {
            if(concertID <= 0)
                return BadRequest($"ID Values are strictly positive. {concertID} is not a valid ID.");

            try
            {
                var clinks = Context.CLinks.Where(l => l.ConcertID == concertID).ToList();
                List<Artist> artists = new List<Artist>();
                foreach (var link in clinks)
                {
                    artists.Add(Context.Artists.Where(a => a.ID == link.ArtistID).FirstOrDefault());
                }
                return Ok(artists);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpGet]
        [Route("page/{page}")]
        public async Task<ActionResult> GetConcertPage(int page = 1)
        {
            try
            {
                if (page < 1)
                    page = 1;

                const int itemsPerPage = 20;
                int skip = (page - 1) * itemsPerPage;
                int count = Context.Concerts.Count();

                if (skip >= count)
                    skip = count / 20;

                var concerts = Context.Concerts.OrderBy(a => a.Name).Skip(skip).Take(itemsPerPage);

                return Ok(concerts);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Route("Single/{concertID}")]
        public async Task<ActionResult> GetSingleConcert(int concertID)
        {
            if (concertID <= 0)
                return BadRequest($"ID Values are strictly positive. {concertID} is not a valid ID.");

            try
            {
                var concert = await Context.Concerts.FindAsync(concertID);
                if (concert == null)
                    return NotFound("Could not find the related concert. Try with a different ID.");

                return Ok(concert);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateConcert([FromBody] Concert concert)
        {
            if(concert.ID != 0)
                return BadRequest("ID not 0. ID needs to be 0 for auto-increment.");
            try
            {
                Context.Concerts.Add(concert);
                await Context.SaveChangesAsync();
                return Ok(concert);
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        [Route("{concertID}/{artistID}")]
        public async Task<ActionResult> AddArtistToConcert(int concertID, int artistID)
        {
            if (concertID <= 0)
                return BadRequest($"ID Values are strictly positive. {concertID} is not a valid ID.");
            if (artistID <= 0)
                return BadRequest($"ID Values are strictly positive. {artistID} is not a valid ID.");

            try
            {
                var concert = await Context.Concerts.FindAsync(concertID);
                if (concert == null)
                    return NotFound("Could not find the related concert. Try with a different ID.");

                var artist = await Context.Artists.FindAsync(artistID);
                if (artist == null)
                    return NotFound("Could not find the related artist. Try with a different ID.");

                ConcertLink link = new() { ID = 0, ConcertID = concertID, ArtistID = artistID };
                Context.CLinks.Add(link);
                await Context.SaveChangesAsync();
                return Ok(link);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete]
        [Route("{concertID}")]
        public async Task<ActionResult> DeleteConcert(int concertID)
        {
            var concert = await Context.Concerts.FindAsync(concertID);
            if (concert != null)
            {
                var links = Context.CLinks.Where(l => l.ConcertID == concertID);
                Context.CLinks.RemoveRange(links);
                Context.Concerts.Remove(concert);
            }
            await Context.SaveChangesAsync();
            return Ok("Entity removed successfully.");
        }

        [HttpDelete]
        [Route("{concertID}/{artistID}")]
        public async Task<ActionResult> DeleteLink(int concertID, int artistID)
        {
            if (concertID <= 0)
                return BadRequest($"ID Values are strictly positive. {concertID} is not a valid ID.");

            if (artistID <= 0)
                return BadRequest($"ID Values are strictly positive. {artistID} is not a valid ID.");

            try
            {
                var concert = await Context.Concerts.FindAsync(concertID);
                if (concert == null)
                    return NotFound("Could not find the related concert. Try with a different ID.");

                var artist = await Context.Artists.FindAsync(artistID);
                if (artist == null)
                    return NotFound("Could not find the related artist. Try with a different ID.");


                var link = Context.CLinks.Where(l => l.ConcertID == concertID && l.ArtistID == artistID).FirstOrDefault();
                if (link == null)
                    return NotFound("Could not find the related concert link. Try with a different ID.");

                Context.CLinks.Remove(link);
                await Context.SaveChangesAsync();
                return Ok("Entity removed successfully.");
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
