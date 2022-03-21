import { Artist } from "../Artist.js";
import { Album } from "../Album.js";
import { Song } from "../Song.js";

var parentDiv = document.querySelector("#parent");

var artist = new Artist("Caligula's Horse", "opis2", "https://cdns-images.dzcdn.net/images/artist/d5dda59496498561d200b4db1dba69f5/500x500.jpg", "Band", "1997", null, "https://www.youtube.com/channel/UCSvdryUV4PNFuS8fYzD8vcw", "https://open.spotify.com/artist/6Zd7AjXsoLaweP9FHyudVC?si=bdRKPvWyRHqs8QEqXrjcNw");
var album = new Album("Rise Radiant", "Progressive Rock", 2020, "https://www.angrymetalguy.com/wp-content/uploads/2020/05/Album_Cover-500x500.jpg", "https://www.youtube.com/watch?v=dNc5PT645sU&list=PL9hYR5qRkc2yEMrZuVoQJBXIKp3BseN5r", "https://open.spotify.com/album/1BvdqjCZOvhxZU8HZmqRrA?si=Dn9tSfI7TsaZf5iwOTOkyg", 2);

var song1 = new Song("Autumn" ,"https://youtu.be/-sIJExhTlUQ","https://open.spotify.com/track/3pv3bsGI0gzamJzN3m1wmR?si=0b092f740ea34591", 2);
var songs = [song1, song1];


var albumLabel = document.createElement("h1");
albumLabel.textContent = "Album Info";
parentDiv.appendChild(albumLabel);

var albumDiv = document.createElement("div");
albumDiv.classList.add("albumInfo");

var albumImg = document.createElement("img");
albumImg.src = album.Image;

var albumInfoDiv = document.createElement("div");
albumInfoDiv.classList.add("albumInfoContent");

//#region album info
for (const [key, value] of Object.entries(album)) {

    let lbl = key;
    let inpt = value;
    if(key == "ArtistID")
    {
        lbl = artist.ArtistType;
        inpt = artist.Name;
    }

    let infoDiv = document.createElement("div");
    infoDiv.classList.add("albumInfoEntry");

    let label = document.createElement("label");
    label.textContent = lbl + ": ";
    infoDiv.appendChild(label);

    let input = document.createElement("input");
    input.classList.add("albumInfoEntry");
    input.value = inpt;
    input.readOnly = true;
    infoDiv.appendChild(input);

    let edit = document.createElement("i");
    edit.classList.add("fa-solid");
    edit.classList.add("fa-pen");
    edit.addEventListener('click', f => {
        input.readOnly = !input.readOnly;
        if(input.readOnly)
            edit.classList.remove("active");
        else
            edit.classList.add("active");
    });
    infoDiv.appendChild(edit);

    albumInfoDiv.appendChild(infoDiv);
}

albumDiv.appendChild(albumImg);
albumDiv.appendChild(albumInfoDiv);
parentDiv.appendChild(albumDiv);
//#endregion

var tracklistLabel = document.createElement("h1");
tracklistLabel.textContent = "Tracklist:";
parentDiv.appendChild(tracklistLabel);

//#region song list

var songsDiv = document.createElement("div");
songsDiv.classList.add("albumSongs");

songs.forEach( song => {
    //create songDiv
    let songDiv = document.createElement("div");
    songDiv.classList.add("albumSong");

    for (const [key, value] of Object.entries(song)) {
        if(key == "AlbumID")
            continue;

        let container = document.createElement("div");
        container.classList.add("albumSongEntry");

        let label = document.createElement("label");
        label.textContent = key + ": ";
        container.appendChild(label);

        let input = document.createElement("input");
        input.value = value;
        input.readOnly = true;
        input.classList.add("albumSongEntry");
        container.appendChild(input);

        let edit = document.createElement("i");
        edit.classList.add("fa-solid");
        edit.classList.add("fa-pen");
        edit.addEventListener('click', f => {
            input.readOnly = !input.readOnly;
            if(input.readOnly)
                edit.classList.remove("active");
            else
                edit.classList.add("active");
        });
        container.appendChild(edit);

        songDiv.appendChild(container);
    }
    let trash = document.createElement("i");
    trash.classList.add("fa-solid");
    trash.classList.add("fa-trash-can");
    trash.textContent = " Delete this song";
    songDiv.appendChild(trash);
    songsDiv.appendChild(songDiv);
});

parentDiv.appendChild(songsDiv);

//#endregion

var buttonsDiv = document.createElement("div");
buttonsDiv.classList.add("buttonsDiv");
parentDiv.appendChild(buttonsDiv);

var saveButton = document.createElement("button");
saveButton.classList.add("save");
saveButton.textContent = "Save Changes";
saveButton.addEventListener('click', f => {

});

var cancelButton = document.createElement("button");
cancelButton.classList.add("cancel");
cancelButton.textContent = "Cancel Changes";
cancelButton.addEventListener('click', f => {

});

buttonsDiv.appendChild(saveButton);
buttonsDiv.appendChild(cancelButton);