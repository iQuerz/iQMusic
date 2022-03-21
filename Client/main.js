import { Artist } from "./Artist.js";
import { Album } from "./Album.js";
import { Song } from "./Song.js";

var pesma1 = new Song("Nikotin","https://youtu.be/hSv6jIda_eU","https://open.spotify.com/track/5K4jxTeuzMHi3nqzGtAhYU?si=81a3d1fabdbb4412", 1);
var pesma2 = new Song("Autumn" ,"https://youtu.be/-sIJExhTlUQ","https://open.spotify.com/track/3pv3bsGI0gzamJzN3m1wmR?si=0b092f740ea34591", 2);

var album2 = new Album("Rise Radiant", "Progressive Rock", 2020, "https://www.angrymetalguy.com/wp-content/uploads/2020/05/Album_Cover-500x500.jpg", "https://www.youtube.com/watch?v=dNc5PT645sU&list=PL9hYR5qRkc2yEMrZuVoQJBXIKp3BseN5r", "https://open.spotify.com/album/1BvdqjCZOvhxZU8HZmqRrA?si=Dn9tSfI7TsaZf5iwOTOkyg", 2);
var album3 = new Album("Rise Radiant", "Progressive Rock", 2020, "https://www.angrymetalguy.com/wp-content/uploads/2020/05/Album_Cover-500x500.jpg", "https://www.youtube.com/watch?v=dNc5PT645sU&list=PL9hYR5qRkc2yEMrZuVoQJBXIKp3BseN5r", "https://open.spotify.com/album/1BvdqjCZOvhxZU8HZmqRrA?si=Dn9tSfI7TsaZf5iwOTOkyg", 2);
var album4 = new Album("Rise Radiant", "Progressive Rock", 2020, "https://www.angrymetalguy.com/wp-content/uploads/2020/05/Album_Cover-500x500.jpg", "https://www.youtube.com/watch?v=dNc5PT645sU&list=PL9hYR5qRkc2yEMrZuVoQJBXIKp3BseN5r", "https://open.spotify.com/album/1BvdqjCZOvhxZU8HZmqRrA?si=Dn9tSfI7TsaZf5iwOTOkyg", 2);
var album5 = new Album("Rise Radiant", "Progressive Rock", 2020, "https://www.angrymetalguy.com/wp-content/uploads/2020/05/Album_Cover-500x500.jpg", "https://www.youtube.com/watch?v=dNc5PT645sU&list=PL9hYR5qRkc2yEMrZuVoQJBXIKp3BseN5r", "https://open.spotify.com/album/1BvdqjCZOvhxZU8HZmqRrA?si=Dn9tSfI7TsaZf5iwOTOkyg", 2);

var artist2 = new Artist("Caligula's Horse", "opis2", "https://cdns-images.dzcdn.net/images/artist/d5dda59496498561d200b4db1dba69f5/500x500.jpg", "Band", "1997", null, "https://www.youtube.com/channel/UCSvdryUV4PNFuS8fYzD8vcw", "https://open.spotify.com/artist/6Zd7AjXsoLaweP9FHyudVC?si=bdRKPvWyRHqs8QEqXrjcNw");
var artist3 = new Artist("Caligula's Horse", "opis2", "https://cdns-images.dzcdn.net/images/artist/d5dda59496498561d200b4db1dba69f5/500x500.jpg", "Band", "1997", null, "https://www.youtube.com/channel/UCSvdryUV4PNFuS8fYzD8vcw", "https://open.spotify.com/artist/6Zd7AjXsoLaweP9FHyudVC?si=bdRKPvWyRHqs8QEqXrjcNw");
var artist4 = new Artist("Caligula's Horse", "opis2", "https://cdns-images.dzcdn.net/images/artist/d5dda59496498561d200b4db1dba69f5/500x500.jpg", "Band", "1997", null, "https://www.youtube.com/channel/UCSvdryUV4PNFuS8fYzD8vcw", "https://open.spotify.com/artist/6Zd7AjXsoLaweP9FHyudVC?si=bdRKPvWyRHqs8QEqXrjcNw");
var artist5 = new Artist("Caligula's Horse", "opis2", "https://cdns-images.dzcdn.net/images/artist/d5dda59496498561d200b4db1dba69f5/500x500.jpg", "Band", "1997", null, "https://www.youtube.com/channel/UCSvdryUV4PNFuS8fYzD8vcw", "https://open.spotify.com/artist/6Zd7AjXsoLaweP9FHyudVC?si=bdRKPvWyRHqs8QEqXrjcNw");
var artist6 = new Artist("Caligula's Horse", "opis2", "https://cdns-images.dzcdn.net/images/artist/d5dda59496498561d200b4db1dba69f5/500x500.jpg", "Band", "1997", null, "https://www.youtube.com/channel/UCSvdryUV4PNFuS8fYzD8vcw", "https://open.spotify.com/artist/6Zd7AjXsoLaweP9FHyudVC?si=bdRKPvWyRHqs8QEqXrjcNw");
var artist7 = new Artist("Caligula's Horse", "opis2", "https://cdns-images.dzcdn.net/images/artist/d5dda59496498561d200b4db1dba69f5/500x500.jpg", "Band", "1997", null, "https://www.youtube.com/channel/UCSvdryUV4PNFuS8fYzD8vcw", "https://open.spotify.com/artist/6Zd7AjXsoLaweP9FHyudVC?si=bdRKPvWyRHqs8QEqXrjcNw");

var Songs = [pesma1, pesma2];
var Albums = [album2, album3, album4, album5];
var Artists = [artist2, artist3, artist4, artist5, artist6, artist7];

var parentDiv = document.querySelector("#parent");
var divs = ["Albums", "Artists"];

// two divs. one for albums one for artists
divs.forEach(x => {
    let containerDiv = document.createElement("div");
    containerDiv.classList.add("container");

    //label div
    let labelDiv = document.createElement("div");
    labelDiv.classList.add("labelDiv");

    //left btn
    let left = document.createElement("i");
    left.classList.add("fa-solid");
    left.classList.add("fa-chevron-left");

    //label
    let label = document.createElement("h1");
    label.textContent = x;

    //right btn
    let right = document.createElement("i");
    right.classList.add("fa-solid");
    right.classList.add("fa-chevron-right");

    //plus
    let plusSign = document.createElement("i");
    plusSign.classList.add("fa-solid");
    plusSign.classList.add("fa-circle-plus");

    labelDiv.appendChild(left);
    labelDiv.appendChild(label);
    labelDiv.appendChild(right);
    labelDiv.appendChild(plusSign);

    containerDiv.appendChild(labelDiv);

    //content div
    let contentDiv = document.createElement("div");
    contentDiv.classList.add("contentDiv");

    //#region content elements creation
    if(x == "Albums"){
        Albums.forEach((album,index) => {
            let albumDiv = document.createElement("div");
            albumDiv.classList.add("contentElement")
            let albumImg = document.createElement("img");
            albumImg.src = album.Image;
            let albumName = document.createElement("label");
            albumName.textContent = album.Name;
            albumDiv.appendChild(albumImg);
            albumDiv.appendChild(albumName);
            contentDiv.appendChild(albumDiv);
            albumDiv.addEventListener('click', f => {
                console.log(album);
            });
        });
    }
    else{
        Artists.forEach( artist => {
            let artistDiv = document.createElement("div");
            artistDiv.classList.add("contentElement")
            let artistImg = document.createElement("img");
            artistImg.src = artist.Image;
            let artistName = document.createElement("label");
            artistName.textContent = artist.Name;
            artistDiv.appendChild(artistImg);
            artistDiv.appendChild(artistName);
            contentDiv.appendChild(artistDiv);
            artistDiv.addEventListener('click', f => {
                console.log(artist);
            });
        });
    }
    //#endregion

    containerDiv.appendChild(contentDiv);

    parentDiv.appendChild(containerDiv);
});