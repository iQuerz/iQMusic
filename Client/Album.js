export class Album{

    constructor(ID, Name, Genre, Year, Image, Youtube, Spotify, ArtistID){
        this.ID = ID;
        this.Name = Name;
        this.ArtistID = ArtistID;
        this.Genre = Genre;
        this.Year = Year;
        this.Image = Image;
        this.Youtube = Youtube;
        this.Spotify = Spotify;
    };

    renderPreview() {
        let albumDiv = document.createElement("div");
        albumDiv.classList.add("contentElement")
        let albumImg = document.createElement("img");
        albumImg.src = this.Image;
        let albumName = document.createElement("label");
        albumName.textContent = this.Name;
        albumDiv.appendChild(albumImg);
        albumDiv.appendChild(albumName);
        //contentDiv.appendChild(albumDiv);
        albumDiv.addEventListener('click', f => {
            localStorage.setItem('album', JSON.stringify(this));
            window.open("AlbumView/album.html", "_self");
        });
        return albumDiv;
    };

    renderDetails(artistType, artistName, albumDiv) {
        var albumImg = document.createElement("img");
        albumImg.src = this.Image;

        var albumInfoDiv = document.createElement("div");
        albumInfoDiv.classList.add("albumInfoContent");

        //#region album info
        for (const [key, value] of Object.entries(this)) {

            let lbl = key;
            let inpt = value;
            if(key == "ArtistID")
            {
                lbl = artistType;
                inpt = artistName;
            }
            if(key == "ID")
                continue;

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

        //#endregion
    }

    renderShortDetails(albumsDiv){
        let albumDiv = document.createElement("div");
        albumDiv.classList.add("artistAlbum");

        let container = document.createElement("div");
        container.classList.add("artistAlbumEntry");

        let albumImg = document.createElement("img");
        albumImg.classList.add("albumImg");
        albumImg.src = this.Image;
        container.appendChild(albumImg);

        let albumName = document.createElement("h2");
        albumName.textContent = this.Name;
        container.appendChild(albumName);

        albumDiv.addEventListener('click', f => {
            localStorage.setItem('album', JSON.stringify(this));
            window.open("../AlbumView/album.html", "_self");
        });
        albumDiv.appendChild(container);
        albumsDiv.appendChild(albumDiv);
    }
}
