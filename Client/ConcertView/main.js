import { Artist } from "../Artist.js";
import { Concert } from "../Concert.js";

const api = "https://localhost:5001/api/";
var parentDiv = document.querySelector("#parent");

var concert = JSON.parse(localStorage.getItem('concert'));
concert = new Concert(concert.ID, concert.Name, concert.Image, concert.Date, concert.Url);

var artists = await getArtists(concert.ID);

var concertLabel = document.createElement("h1");
concertLabel.classList.add("delete");
concertLabel.textContent = "Concert Info";
concertLabel.addEventListener('mouseenter', f => {
    concertLabel.textContent = "Delete this concert";
});
concertLabel.addEventListener('mouseleave', f => {
    concertLabel.textContent = "Concert Info";
});
concertLabel.addEventListener('click', async f => {
    let response = await fetch(api + "Concerts/" + concert.ID, {
        method: 'DELETE'
    })
    if(!response.ok){
        let err = await response.json();
        alert(err.title);
        return;
    }
    alert("Concert successfully removed.");
    window.open("../index.html", "_self");
})
parentDiv.appendChild(concertLabel);

var concertDiv = document.createElement("div");
concertDiv.classList.add("concertInfo");
concert.renderDetails(concertDiv);
parentDiv.appendChild(concertDiv);


//#region buttons div

var buttonsDiv = document.createElement("div");
buttonsDiv.classList.add("buttonsDiv");
parentDiv.appendChild(buttonsDiv);

var saveButton = document.createElement("button");
saveButton.classList.add("save");
saveButton.textContent = "Save Changes";
saveButton.addEventListener('click', async f => {
    await saveChanges();
    concertDiv.textContent = '';
    concert.renderDetails(concertDiv);

    artistsDiv.textContent = '';
    artists.forEach( artist => {
        artist.renderShortDetails(artistsDiv);
    });
});

var cancelButton = document.createElement("button");
cancelButton.classList.add("cancel");
cancelButton.textContent = "Cancel Changes";
cancelButton.addEventListener('click', f => {
    concertDiv.textContent = '';
    concert.renderDetails(concertDiv);

    artistsDiv.textContent = '';
    artists.forEach( artist => {
        artist.renderShortDetails(artistsDiv);
    });
});

buttonsDiv.appendChild(saveButton);
buttonsDiv.appendChild(cancelButton);

//#endregion

//#region artist list

var artistsLabel = document.createElement("h1");
artistsLabel.textContent = "Artists:";
parentDiv.appendChild(artistsLabel);

var artistsDiv = document.createElement("div");
artistsDiv.classList.add("concertArtists");

artists.forEach( artist => {
    artist.renderShortDetails(artistsDiv);
});

parentDiv.appendChild(artistsDiv);

//#endregion

//#region edit artist

var artistsLabel = document.createElement("h1");
artistsLabel.textContent = "Edit artist:";
parentDiv.appendChild(artistsLabel);

var newArtistDiv = document.createElement("div");
newArtistDiv.classList.add("addArtistDiv");
parentDiv.appendChild(newArtistDiv);

var addInput = document.createElement("input");
addInput.value = "artist name";
addInput.classList.add("addArtistElem");
newArtistDiv.appendChild(addInput);

var addBtn = document.createElement("i");
addBtn.classList.add("fa-solid");
addBtn.classList.add("fa-circle-plus");
addBtn.classList.add("addArtistElem");
addBtn.addEventListener('click', async f => {
    await addArtist(addInput.value);
});
newArtistDiv.appendChild(addBtn);

var rmvBtn = document.createElement("i");
rmvBtn.classList.add("fa-solid");
rmvBtn.classList.add("fa-circle-minus");
rmvBtn.classList.add("addArtistElem");
rmvBtn.addEventListener('click', async f => {
    await rmvArtist(addInput.value);
});
newArtistDiv.appendChild(rmvBtn);

//#endregion


async function getArtists(artistID){
    let response = await fetch(api + "Concerts/" + artistID + "/Artists");
    let data = await response.json();
    let artists = [];
    data.forEach(artist => {
        let a = new Artist(artist.id, artist.name, artist.description,artist.image,artist.artistType,artist.startDate,artist.endDate,artist.youtube,artist.spotify);
        artists.push(a);
    });
    return artists;
}
async function saveChanges(){
    let artistDiv = document.querySelector(".concertInfo");
    let artistInputs = artistDiv.querySelectorAll("input");
    
    let newConcert = new Concert(concert.ID, artistInputs[0].value, artistInputs[1].value, artistInputs[2].value, artistInputs[3].value);

    if(newConcert.ID == 0){
        let response = await fetch(api + "Concerts", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newConcert)
        });
        if(!response.ok){
            let err = await response.json();
            alert(err.title);
            return;
        }
        let data = await response.json();
        concert = newConcert;
        concert.ID = data.id;
        artists = await getArtists(concert.ID);
        alert("Update successful.");
        return;
    }

    let response = await fetch(api + "Concerts/" + newConcert.ID, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newConcert)
    });
    if(!response.ok){
        let err = await response.json();
        alert(err.title);
        return;
    }
    let data = await response.json();
    newConcert.ID = data.id;
    concert = newConcert;
    alert("Update successful.");
}

async function addArtist(artistName){
    let artistID = await getIDFromArtist(artistName);
    if(artistID == 0)
        return;

    let response = await fetch(api + "Concerts/" + concert.ID + "/" + artistID, {
        method: 'POST'
    });
    if(response.ok){
        alert("Artist added successfully.");
        artistsDiv.textContent = '';
        artists = await getArtists(concert.ID);
        artists.forEach(artist => {
            artist.renderShortDetails(artistsDiv);
        })
    }
    else{
        console.log(response);
        let data = await response.json();
        console.log(data);
        alert(data);
    }
}
async function rmvArtist(artistName){
    let artistID = await getIDFromArtist(artistName);
    if(artistID == undefined)
        return;

    let response = await fetch(api + "Concerts/" + concert.ID + "/" + artistID, { method: 'DELETE' });
    console.log(response);
    console.log(api + "Concerts/" + concert.ID + "/" + artistID);
    if(response.ok){
        let data = await response.text();
        alert(data);
        artistsDiv.textContent = '';
        artists = await getArtists(concert.ID);
        artists.forEach(artist => {
            artist.renderShortDetails(artistsDiv);
        })
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