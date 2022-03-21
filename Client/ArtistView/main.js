import { Artist } from "../Artist.js";
import { Album } from "../Album.js";
import { Song } from "../Song.js";

var parentDiv = document.querySelector("#parent");

var artist = new Artist("Caligula's Horse", "opis2", "https://cdns-images.dzcdn.net/images/artist/d5dda59496498561d200b4db1dba69f5/500x500.jpg", "Band", "1997", null, "https://www.youtube.com/channel/UCSvdryUV4PNFuS8fYzD8vcw", "https://open.spotify.com/artist/6Zd7AjXsoLaweP9FHyudVC?si=bdRKPvWyRHqs8QEqXrjcNw");
var album1 = new Album("Rise Radiant", "Progressive Rock", 2020, "https://www.angrymetalguy.com/wp-content/uploads/2020/05/Album_Cover-500x500.jpg", "https://www.youtube.com/watch?v=dNc5PT645sU&list=PL9hYR5qRkc2yEMrZuVoQJBXIKp3BseN5r", "https://open.spotify.com/album/1BvdqjCZOvhxZU8HZmqRrA?si=Dn9tSfI7TsaZf5iwOTOkyg", 2);
var albums = [album1, album1];


var artistLabel = document.createElement("h1");
artistLabel.textContent = artist.ArtistType + " Info";
parentDiv.appendChild(artistLabel);

var artistDiv = document.createElement("div");
artistDiv.classList.add("artistInfo");

var artistImg = document.createElement("img");
artistImg.src = artist.Image;

var artistInfoDiv = document.createElement("div");
artistInfoDiv.classList.add("artistInfoContent");

//#region artist info
for (const [key, value] of Object.entries(artist)) {

    let lbl = key;
    let inpt = value;
    if(key == "StartDate")
    {
        if(artist.ArtistType == "Band")
            lbl = "Formed";
        else
            lbl = "Born"
    }
    if(key == "EndDate")
    {
        if(artist.ArtistType == "Band")
            lbl = "Breakup"
        else
            lbl = "Died"
    }

    let infoDiv = document.createElement("div");
    infoDiv.classList.add("artistInfoEntry");

    let label = document.createElement("label");
    label.textContent = lbl + ": ";
    infoDiv.appendChild(label);

    let input = document.createElement("input");
    input.classList.add("artistInfoEntry");
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

    artistInfoDiv.appendChild(infoDiv);
}

artistDiv.appendChild(artistImg);
artistDiv.appendChild(artistInfoDiv);
parentDiv.appendChild(artistDiv);
//#endregion

var tracklistLabel = document.createElement("h1");
tracklistLabel.textContent = "Albums:";
parentDiv.appendChild(tracklistLabel);

//#region album list

var albumsDiv = document.createElement("div");
albumsDiv.classList.add("artistAlbums");

albums.forEach( album => {
    //create songDiv
    let albumDiv = document.createElement("div");
    albumDiv.classList.add("artistAlbum");

    for (const [key, value] of Object.entries(album)) {
        if(key == "ArtistID")
            continue;

        let container = document.createElement("div");
        container.classList.add("artistAlbumEntry");

        let label = document.createElement("label");
        label.textContent = key + ": ";
        container.appendChild(label);

        let input = document.createElement("input");
        input.value = value;
        input.readOnly = true;
        input.classList.add("artistAlbumEntry");
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

        albumDiv.appendChild(container);
    }
    let trash = document.createElement("i");
    trash.classList.add("fa-solid");
    trash.classList.add("fa-trash-can");
    trash.textContent = " Delete this album";
    albumDiv.appendChild(trash);
    albumsDiv.appendChild(albumDiv);
});

parentDiv.appendChild(albumsDiv);

//#endregion

var buttonsDiv = document.createElement("div");
buttonsDiv.classList.add("buttonsDiv");
parentDiv.appendChild(buttonsDiv);

var saveButton = document.createElement("button");
saveButton.classList.add("save");
saveButton.textContent = "Save Changes";
saveButton.addEventListener('click', f => {
    //save click event
});

var cancelButton = document.createElement("button");
cancelButton.classList.add("cancel");
cancelButton.textContent = "Cancel Changes";
cancelButton.addEventListener('click', f => {
    //cancel click event
});

buttonsDiv.appendChild(saveButton);
buttonsDiv.appendChild(cancelButton);