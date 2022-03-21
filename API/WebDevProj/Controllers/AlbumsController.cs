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
        [Route("{AlbumID}")]
        public async Task<ActionResult> GetAlbum(int AlbumID)
        {
            if (AlbumID <= 0)
            {
                return BadRequest();
            }

            var album = await Context.Albums.FindAsync(AlbumID);

            if (album == null)
                return BadRequest();

            return Ok(album);
        }

        [HttpGet]
        [Route("page/{page}")]
        public async Task<ActionResult> GetAlbumsPage(int page = 1)
        {
            if (page < 1)
                page = 1;

            const int itemsPerPage = 20;
            int skip = (page - 1) * itemsPerPage;
            int count = Context.Artists.Count();

            if (skip >= count)
                skip = count / 20;

            var albums = Context.Albums.Skip(skip).Take(itemsPerPage);

            return Ok(albums);
        }

        [HttpPost]
        public async Task<ActionResult> CreateAlbum([FromBody] Album album)
        {
            if (album.ID != 0)
                return BadRequest(); //create se bez id

            var test = Context.Albums.Where(a => a.Name.ToLower() == album.Name.ToLower()).FirstOrDefault();
            if (test != null)
                return BadRequest(); //vec postoji

            Context.Albums.Add(album);
            await Context.SaveChangesAsync();
            return Ok(album);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> UpdateArtist([FromBody] Album album, int id)
        {
            var a = await Context.Albums.FindAsync(album.ID);
            if (a == null)
                return BadRequest(); //ne postoji

            if (a.Name != album.Name)
            {
                var test = Context.Albums.Where(x => x.Name.ToLower() == album.Name.ToLower()).FirstOrDefault();
                if (test != null)
                    return BadRequest(); //ime vec postoji
            }

            a = album;
            await Context.SaveChangesAsync();

            return Ok(album);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> DeleteAlbum(int id)
        {
            if (id <= 0)
                return BadRequest(); //nemoz bude <0

            var album = await Context.Albums.FindAsync(id);

            if (album == null)
                return BadRequest(); //ne postoji

            Context.Albums.Remove(album);
            return Ok("Entity removed succesfully.");
        }
    }
}
