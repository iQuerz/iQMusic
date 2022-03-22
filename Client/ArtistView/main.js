import { Artist } from "../Artist.js";
import { Album } from "../Album.js";
import { Song } from "../Song.js";

const api = "https://localhost:5001/api/";
var parentDiv = document.querySelector("#parent");

var artist = JSON.parse(localStorage.getItem('artist'));
artist = new Artist(artist.ID, artist.Name, artist.Description, artist.Image, artist.ArtistType, artist.StartDate, artist.EndDate, artist.Youtube, artist.Spotify);

var albums = await getAlbums(artist.ID);

var artistLabel = document.createElement("h1");
artistLabel.classList.add("delete");
artistLabel.textContent = artist.getArtistType() + " Info";
artistLabel.addEventListener('mouseenter', f => {
    artistLabel.textContent = "Delete this " + artist.getArtistType();
});
artistLabel.addEventListener('mouseleave', f => {
    artistLabel.textContent = artist.getArtistType() + " Info";
});
artistLabel.addEventListener('click', async f => {
    let response = await fetch(api + "Artists/" + artist.ID, {
        method: 'DELETE'
    })
    if(!response.ok){
        let err = await response.json();
        alert(err.title);
        return;
    }
    alert(artist.getArtistType() + " successfully removed.");
    window.open("../index.html", "_self");
})
parentDiv.appendChild(artistLabel);

var artistDiv = document.createElement("div");
artistDiv.classList.add("artistInfo");
artist.renderDetails(artistDiv);
parentDiv.appendChild(artistDiv);

var tracklistLabel = document.createElement("h1");
tracklistLabel.textContent = "Albums:";
parentDiv.appendChild(tracklistLabel);

//#region album list

var albumsDiv = document.createElement("div");
albumsDiv.classList.add("artistAlbums");

albums.forEach( album => {
    album.renderShortDetails(albumsDiv);
});

parentDiv.appendChild(albumsDiv);

//#endregion

var buttonsDiv = document.createElement("div");
buttonsDiv.classList.add("buttonsDiv");
parentDiv.appendChild(buttonsDiv);

var saveButton = document.createElement("button");
saveButton.classList.add("save");
saveButton.textContent = "Save Changes";
saveButton.addEventListener('click', async f => {
    await saveChanges();
    artistDiv.textContent = '';
    artist.renderDetails(artistDiv);

    albumsDiv.textContent = '';
    albums.forEach( album => {
        album.renderShortDetails(albumsDiv);
    });
});

var cancelButton = document.createElement("button");
cancelButton.classList.add("cancel");
cancelButton.textContent = "Cancel Changes";
cancelButton.addEventListener('click', f => {
    artistDiv.textContent = '';
    artist.renderDetails(artistDiv);

    albumsDiv.textContent = '';
    albums.forEach( album => {
        album.renderShortDetails(albumsDiv);
    });
});

buttonsDiv.appendChild(saveButton);
buttonsDiv.appendChild(cancelButton);

async function getAlbums(artistID){
    let response = await fetch(api + "Albums/artist/" + artistID);
    let data = await response.json();
    let albums = [];
    data.forEach(album => {
        let a = new Album(album.id, album.name, album.genre, album.year, album.image, album.youtube, album.spotify, album.artistID);
        albums.push(a);
    });
    return albums;
}
async function saveChanges(){
    let artistDiv = document.querySelector(".artistInfo");
    let artistInputs = artistDiv.querySelectorAll("input");
    
    let newArtist = new Artist(artist.ID, artistInputs[0].value, artistInputs[1].value, artistInputs[2].value, parseInt(artistInputs[3].value), artistInputs[4].value, artistInputs[5].value, artistInputs[6].value, artistInputs[7].value);

    if(newArtist.ID == 0){
        let response = await fetch(api + "Artists", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newArtist)
        });
        if(!response.ok){
            let err = await response.json();
            alert(err.title);
            return;
        }
        let data = await response.json();
        artist = newArtist;
        artist.ID = data.id;
        albums = await getAlbums(artist.ID);
        alert("Update successful.");
        return;
    }

    let response = await fetch(api + "Artists/" + newArtist.ID, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArtist)
    });
    if(!response.ok){
        let err = await response.json();
        alert(err.title);
        return;
    }
    artist = newArtist;
    alert("Update successful.");
}