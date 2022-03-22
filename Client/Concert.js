export class Concert {
    constructor(ID, Name, Image, Date, Url){
        this.ID = ID,
        this.Name = Name,
        this.Image = Image,
        this.Date = Date,
        this.Url = Url
    }

    renderPreview(){
        let concertDiv = document.createElement("div");
        concertDiv.classList.add("contentElement")
        let concertImg = document.createElement("img");
        concertImg.src = this.Image;
        let concertName = document.createElement("label");
        concertName.textContent = this.Name;
        concertDiv.appendChild(concertImg);
        concertDiv.appendChild(concertName);
        concertDiv.addEventListener('click', f => {
            localStorage.setItem('concert', JSON.stringify(this));
            window.open("ConcertView/concert.html", "_self");
        })
        return concertDiv;
    }

    renderDetails(concertDiv){
        var concertImg = document.createElement("img");
        concertImg.src = this.Image;

        var concertInfoDiv = document.createElement("div");
        concertInfoDiv.classList.add("concertInfoContent");

        for (const [key, value] of Object.entries(this)) {

            let lbl = key;
            let inpt = value;
            
            if(key == "ID")
                continue;

            let infoDiv = document.createElement("div");
            infoDiv.classList.add("concertInfoEntry");

            let label = document.createElement("label");
            label.textContent = lbl + ": ";
            infoDiv.appendChild(label);

            let input = document.createElement("input");
            input.classList.add("concertInfoEntry");
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

            concertInfoDiv.appendChild(infoDiv);
        }

        concertDiv.appendChild(concertImg);
        concertDiv.appendChild(concertInfoDiv);
    }
    renderShortDetails(concertsDiv){
        let concertDiv = document.createElement("div");
        concertDiv.classList.add("artistAlbum");

        let container = document.createElement("div");
        container.classList.add("artistAlbumEntry");

        let concertImg = document.createElement("img");
        concertImg.classList.add("albumImg");
        concertImg.src = this.Image;
        container.appendChild(concertImg);

        let concertName = document.createElement("h2");
        concertName.textContent = this.Name;
        container.appendChild(concertName);

        concertDiv.addEventListener('click', f => {
            localStorage.setItem('concert', JSON.stringify(this));
            window.open("../ConcertView/concert.html", "_self");
        });
        concertDiv.appendChild(container);
        concertsDiv.appendChild(concertDiv);
    }
}