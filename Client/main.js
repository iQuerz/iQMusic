import { Artist } from "./Artist.js";
import { Album } from "./Album.js";
import { Concert } from "./Concert.js";

const api = "https://localhost:5001/api/";

var parentDiv = document.querySelector("#parent");
var divs = ["Albums", "Artists", "Concerts"];
var albumPage = 1, artistPage = 1, concertPage = 1;


// two divs. one for albums one for artists
divs.forEach(x => {
    let containerDiv = document.createElement("div");
    containerDiv.classList.add("container");

    //#region MenuStrip

    //label div
    let labelDiv = document.createElement("div");
    labelDiv.classList.add("labelDiv");

    //left btn
    let left = document.createElement("i");
    left.classList.add("fa-solid");
    left.classList.add("fa-chevron-left");
    left.addEventListener('click', f => {
        contentDiv.textContent = '';

        if(x == "Albums")
            albumPage = newPage(albumPage - 1);
        else if (x == "Artists")
            artistPage = newPage(artistPage - 1);
        else
            concertPage = newPage(concertPage - 1);

        contentDiv = renderContent(x);
        containerDiv.appendChild(contentDiv);
    });

    //label
    let label = document.createElement("h1");
    label.textContent = x;

    //right btn
    let right = document.createElement("i");
    right.classList.add("fa-solid");
    right.classList.add("fa-chevron-right");
    right.addEventListener('click', f => {
        contentDiv.textContent = '';
        if(x == "Albums")
            albumPage++;
        else if (x == "Artists")
            artistPage++;
        else
            concertPage++;

        contentDiv = renderContent(x);
        containerDiv.appendChild(contentDiv);
    });

    //plus
    let plusSign = document.createElement("i");
    plusSign.classList.add("fa-solid");
    plusSign.classList.add("fa-circle-plus");
    plusSign.addEventListener('click', f => {
        if(x == "Albums")
        {
            let a = new Album(0, "exampleName", "exampleGenre", "releaseYear", "https://cdn.discordapp.com/attachments/912736246198046794/955689192627794000/placeholder.jpg", "youtube playlist", "spotify playlist", 9999);
            localStorage.setItem('album', JSON.stringify(a));
            window.open("AlbumView/album.html", "_self");
        }
        else if (x == "Artists")
        {
            let a = new Artist(0, "exampleName", "exampleDescription", "https://cdn.discordapp.com/attachments/912736246198046794/955689192627794000/placeholder.jpg",0,1000,9999, "youtube.com", "spotify.com");
            localStorage.setItem('artist', JSON.stringify(a));
            window.open("ArtistView/artist.html", "_self");
        }
        else{
            let c = new Concert(0, "exampleName", "https://cdn.discordapp.com/attachments/912736246198046794/955689192627794000/placeholder.jpg", "date", "https://youtube.com");
            localStorage.setItem('concert', JSON.stringify(c));
            window.open("ConcertView/concert.html", "_self");
        }
    })

    labelDiv.appendChild(left);
    labelDiv.appendChild(label);
    labelDiv.appendChild(right);
    labelDiv.appendChild(plusSign);

    containerDiv.appendChild(labelDiv);
    //#endregion

    //#region Contents

    //content div (houses albums or artists)
    var contentDiv = renderContent(x);

    containerDiv.appendChild(contentDiv);
    parentDiv.appendChild(containerDiv);
    //#endregion

});

function renderContent(x){
    let contentDiv = document.createElement("div");
    contentDiv.classList.add("contentDiv");

    //#region content elements creation
    let fetchurl = api + x + "/page/";
    if(x == "Albums"){
        fetch(fetchurl + albumPage)
        .then(response => {
            response.json().then(albums => {
                albums.forEach(album => {
                    let a = new Album(album.id, album.name, album.genre, album.year, album.image, album.youtube, album.spotify, album.artistID);
                    contentDiv.appendChild(a.renderPreview());
                })
            })
        })
    }
    else if (x == "Artists"){
        fetch(fetchurl + artistPage)
        .then(response => {
            response.json().then(artists => {
                artists.forEach(artist => {
                    if(artist.id == 9999)
                        return;
                    let a = new Artist(artist.id, artist.name, artist.description, artist.image, artist.artistType, artist.startDate, artist.endDate, artist.youtube, artist.spotify);
                    contentDiv.appendChild(a.renderPreview());
                })
            })
        })
    }
    else{
        fetch(fetchurl + concertPage)
        .then(response => {
            response.json().then(concerts => {
                concerts.forEach(concert => {
                    let c = new Concert(concert.id, concert.name, concert.image, concert.date, concert.url);
                    contentDiv.appendChild(c.renderPreview());
                })
            })
        })
    }
    return contentDiv;
}

function newPage(page){
    if(page<1)
        return 1;
    return page;
}