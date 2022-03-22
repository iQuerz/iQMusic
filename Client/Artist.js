export class Artist{
    
    constructor(ID, Name, Description, Image, ArtistType, StartDate, EndDate, Youtube, Spotify){
        this.ID = ID;
        this.Name = Name;
	    this.Description = Description;
        this.Image = Image;
        this.ArtistType = ArtistType;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.Youtube = Youtube;
        this.Spotify = Spotify;
    }
    
    getArtistType() {
        let type = ["Band", "Artist"];
        return type[this.ArtistType];
    };

    renderPreview(){
        let artistDiv = document.createElement("div");
        artistDiv.classList.add("contentElement")
        let artistImg = document.createElement("img");
        artistImg.src = this.Image;
        let artistName = document.createElement("label");
        artistName.textContent = this.Name;
        artistDiv.appendChild(artistImg);
        artistDiv.appendChild(artistName);
        artistDiv.addEventListener('click', f => {
            localStorage.setItem('artist', JSON.stringify(this));
            window.open("ArtistView/artist.html", "_self");
        });
        return artistDiv;
    }
    renderDetails(artistDiv){

        var artistImg = document.createElement("img");
        artistImg.src = this.Image;

        var artistInfoDiv = document.createElement("div");
        artistInfoDiv.classList.add("artistInfoContent");

        for (const [key, value] of Object.entries(this)) {

            let lbl = key;
            let inpt = value;
            if(key == "StartDate")
            {
                if(this.ArtistType == 0)
                    lbl = "Formed";
                else
                    lbl = "Born"
            }
            if(key == "EndDate")
            {
                if(this.ArtistType == 0)
                    lbl = "Breakup"
                else
                    lbl = "Died"
            }
            if(key == "ID")
                continue;

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

            if(this.ID == 0){
                input.readOnly = false;
                edit.classList.add("active");
            }
            
            infoDiv.appendChild(edit);

            artistInfoDiv.appendChild(infoDiv);
        }

        artistDiv.appendChild(artistImg);
        artistDiv.appendChild(artistInfoDiv);
    }
    renderShortDetails(artistsDiv){
        let artistDiv = document.createElement("div");
        artistDiv.classList.add("concertArtist");

        let container = document.createElement("div");
        container.classList.add("concertArtistEntry");

        let artistImg = document.createElement("img");
        artistImg.classList.add("artistImg");
        artistImg.src = this.Image;
        container.appendChild(artistImg);

        let artistName = document.createElement("h2");
        artistName.textContent = this.Name;
        container.appendChild(artistName);

        artistDiv.addEventListener('click', f => {
            localStorage.setItem('artist', JSON.stringify(this));
            window.open("../ArtistView/artist.html", "_self");
        });
        artistDiv.appendChild(container);
        artistsDiv.appendChild(artistDiv);
    }
}
