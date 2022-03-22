import { Artist } from "../Artist.js";
import { Album } from "../Album.js";
import { Song } from "../Song.js";

const api = "https://localhost:5001/api/";
var parentDiv = document.querySelector("#parent");

var album = JSON.parse(localStorage.getItem('album'));

album = new Album(album.ID, album.Name, album.Genre, album.Year, album.Image, album.Youtube, album.Spotify, album.ArtistID);

var artist = new Artist(0, "artist","","",0);
var songs = [];

if(album.ArtistID != 9999){
    artist = await getArtist(album.ArtistID);
    songs = await getSongs(album.ID);
}

//#region  album info

var albumLabel = document.createElement("h1");
albumLabel.classList.add("delete");
albumLabel.textContent = "Album Info";
albumLabel.addEventListener('mouseenter', f => {
    albumLabel.textContent = "Delete this album";
});
albumLabel.addEventListener('mouseleave', f => {
    albumLabel.textContent = "Album Info";
});
albumLabel.addEventListener('click', async f => {
    let response = await fetch(api + "Albums/" + album.ID, {
        method: 'DELETE'
    })
    if(!response.ok){
        let err = await response.text();
        alert(err.title);
        return;
    }
    alert("Album successfully removed.");
    window.open("../index.html", "_self");
})
parentDiv.appendChild(albumLabel);

var albumDiv = document.createElement("div");
albumDiv.classList.add("albumInfo");
album.renderDetails(artist.getArtistType(), artist.Name, albumDiv);
parentDiv.appendChild(albumDiv);

//#endregion

//#region song list

var tracklistLabel = document.createElement("h1");
tracklistLabel.textContent = "Tracklist:";
parentDiv.appendChild(tracklistLabel);

var songsDiv = document.createElement("div");
songsDiv.classList.add("albumSongs");

songs.forEach(song => {
    song.renderDetails(songsDiv, api);
});

parentDiv.appendChild(songsDiv);

//#endregion

//#region add to song list
var songsLabel = document.createElement("h1");
songsLabel.textContent = "Add songs:";
parentDiv.appendChild(songsLabel);

var newSongDiv = document.createElement("div");
newSongDiv.classList.add("addSongDiv");
parentDiv.appendChild(newSongDiv);

var addInput = document.createElement("input");
addInput.value = "song name";
addInput.classList.add("addSongElem");
newSongDiv.appendChild(addInput);

var addBtn = document.createElement("i");
addBtn.classList.add("fa-solid");
addBtn.classList.add("fa-circle-plus");
addBtn.classList.add("addSongElem");
addBtn.addEventListener('click', async f => {
    await addSong(addInput.value);
});
newSongDiv.appendChild(addBtn);

//#endregion

//#region buttons div

var buttonsDiv = document.createElement("div");
buttonsDiv.classList.add("buttonsDiv");
parentDiv.appendChild(buttonsDiv);

var saveButton = document.createElement("button");
saveButton.classList.add("save");
saveButton.textContent = "Save Changes";
saveButton.addEventListener('click', async f => {
    await saveChanges();
    albumDiv.textContent = '';
    artist = await getArtist(album.ArtistID);
    album.renderDetails(artist.getArtistType(), artist.Name, albumDiv);
    
    songs = await getSongs(album.ID);

    songsDiv.textContent = '';
    songs.forEach(song => {
        song.renderDetails(songsDiv);
    });
});

var cancelButton = document.createElement("button");
cancelButton.classList.add("cancel");
cancelButton.textContent = "Cancel Changes";
cancelButton.addEventListener('click', async f => {
    albumDiv.textContent = '';
    artist = await getArtist(album.ArtistID);
    album.renderDetails(artist.getArtistType(), artist.Name, albumDiv);
    
    songs = await getSongs(album.ID);

    songsDiv.textContent = '';
    songs.forEach(song => {
        song.renderDetails(songsDiv, api);
    });
});

buttonsDiv.appendChild(saveButton);
buttonsDiv.appendChild(cancelButton);

//#endregion


async function getArtist(artistID){
    let response = await fetch(api + "Artists/" + artistID);
    if(response.ok){
        let data = await response.json();
        let artist = new Artist(data.id, data.name, data.description, data.image, data.artistType, data.startDate, data.endDate, data.youtube, data.spotify);
        return artist;
    }
    else{
        let data = await response.text();
        alert(data);
        return undefined;
    }
}
async function getSongs(albumID){
    let response = await fetch(api + "Songs/" + albumID);
    if(response.ok){
        let data = await response.json();
        let songs = [];
        data.forEach(song => {
            let s = new Song(song.id, song.title, song.youtube, song.spotify, song.albumID);
            songs.push(s);
        });
        return songs;
    }
    else{
        let data = await response.text();
        alert(data);
    }
}
async function getIDFromArtist(artistName){
    let response = await fetch(api + "Artists/Name/" + artistName);
    if(response.ok){
        let data = await response.json();
        return data.id;
    }
    else{
        let err = await response.text();
        alert(err);
        return undefined;
    }
}

async function saveChanges(){
    let albumDiv = document.querySelector(".albumInfo");
    let albumInputs = albumDiv.querySelectorAll("input");
    
    let newAlbum = new Album(album.ID, albumInputs[0].value, albumInputs[2].value, albumInputs[3].value, albumInputs[4].value, albumInputs[5].value, albumInputs[6].value, await getIDFromArtist(albumInputs[1].value));
    
    newAlbum.ArtistID = await getIDFromArtist(albumInputs[1].value);

    if(newAlbum.ID == 0){
        let response = await fetch(api + "Albums", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAlbum)
        });
        if(!response.ok){
            let err = await response.text();
            alert(err.title);
            return;
        }
        album = newAlbum;
        artist = getArtist(album.ArtistID);
        alert("Update successful.");
        return;
    }

    const songDivs = document.querySelectorAll(".albumSong");
    let newSongs = [];
    songDivs.forEach((songDiv, index) => {
        let songInputs = songDiv.querySelectorAll("input");
        let newSong = new Song(parseInt(songInputs[0].value), songInputs[1].value, songInputs[2].value, songInputs[3].value, album.ID);
        newSongs.push(newSong);
    });

    newSongs.forEach(async (song) => {
        let response = await fetch(api + "Songs/" + song.ID,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(song)
        });
        if(!response.ok){
            let err = await response.text();
            alert(err.title);
            return;
        }
    })
    let response = await fetch(api + "Albums/" + newAlbum.ID, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAlbum)
    });
    if(!response.ok){
        let err = await response.text();
        alert(err.title);
        return;
    }
    album = newAlbum;
    alert("Update successful.");
}


async function addSong(songName){
    let song = new Song(0, songName, "https://youtube.com", "https://open.spotify.com", album.ID);
    let exists = false;
    songs.forEach(s => {
        if(s.Title == song.Title){
            exists = true;
            return; //?
        }
    });
    if(exists){
        alert("Same song already exists in the album.");
        return;
    }

    let response = await fetch(api + "Songs",{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
    });
    if(response.ok){
        songs = await getSongs(album.ID);

        songsDiv.textContent = '';
        songs.forEach(song => {
            song.renderDetails(songsDiv, api);
        });
        console.log(songs);
        return;
    }
    else{
        let data = await response.text();
        alert(data);
    }
}