import { Artist } from "../Artist.js";
import { Album } from "../Album.js";
import { Song } from "../Song.js";
import { FeatureLink } from "../FeatureLink.js"

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

//label
var albumLabel = document.createElement("h1");
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
        let err = await response.json();
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

var tracklistLabel = document.createElement("h1");
tracklistLabel.textContent = "Tracklist:";
parentDiv.appendChild(tracklistLabel);

//#region song list

var songsDiv = document.createElement("div");
songsDiv.classList.add("albumSongs");

songs.forEach(async (song) => {
    var features = await getSongFeatures(song.ID);
    song.renderDetails(songsDiv, features);
});

parentDiv.appendChild(songsDiv);

//#endregion

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
    songs.forEach(async (song) => {
        var features = await getSongFeatures(song.ID);
        song.renderDetails(songsDiv, features);
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
    songs.forEach(async (song) => {
        var features = await getSongFeatures(song.ID);
        song.renderDetails(songsDiv, features);
    });
});

buttonsDiv.appendChild(saveButton);
buttonsDiv.appendChild(cancelButton);


async function getArtist(artistID){
    let response = await fetch(api + "Artists/" + artistID);
    let data = await response.json();
    let artist = new Artist(data.id, data.name, data.description, data.image, data.artistType, data.startDate, data.endDate, data.youtube, data.spotify);
    return artist;
}
async function getSongs(albumID){
    let response = await fetch(api + "Songs/" + albumID);
    let data = await response.json();
    let songs = [];
    data.forEach(song => {
        let s = new Song(song.id, song.title, song.youtube, song.spotify, song.albumID);
        songs.push(s);
    });
    return songs;
}
async function getSongFeatures(songID){
    let response = await fetch(api + "Links/" + songID);
    let data = await response.json();
    let features = [];
    data.forEach(feature => {
        let f = new FeatureLink(feature.artistID, feature.songID);
        features.push(f);
    })
    let names = [];
    features.forEach(async (feature) => {
        names.push(await getArtistNameFromID(feature.ArtistID));
    })
    return names;
}
async function getArtistNameFromID(artistID){
    let response = await fetch(api + "Artist/" + artistID);
    let data = await response.json();
    return data.name;
}
async function getIDFromArtist(artistName){
    let response = await fetch(api + "Artists/Name/" + artistName);
    let data = await response.json();
    return data.id;
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
            let err = await response.json();
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
            let err = await response.json();
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
        let err = await response.json();
        alert(err.title);
        return;
    }
    album = newAlbum;
    alert("Update successful.");
}