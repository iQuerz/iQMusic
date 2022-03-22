export class Song{

    constructor(ID, Title, Youtube, Spotify, AlbumID){
        this.ID = ID;
        this.Title = Title;
        this.Youtube = Youtube;
        this.Spotify = Spotify;
        this.AlbumID = AlbumID;
    }

    renderDetails(songsDiv, api){
        let songDiv = document.createElement("div");
        songDiv.classList.add("albumSong");

        for (const [key, value] of Object.entries(this)) {
            if(key == "AlbumID")
                continue;

            let container = document.createElement("div");
            container.classList.add("albumSongEntry");

            let label = document.createElement("label");
            label.textContent = key + ": ";

            let input = document.createElement("input");
            input.value = value;
            input.readOnly = true;
            if(key == "ID")
                input.type = "hidden";
            input.classList.add("albumSongEntry");

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

            if(key != "ID")
                container.appendChild(label);
            container.appendChild(input);
            if(key != "ID")
                container.appendChild(edit);
            
            songDiv.appendChild(container);
        }

        let trash = document.createElement("i");
        trash.classList.add("fa-solid");
        trash.classList.add("fa-trash-can");
        trash.textContent = " Delete this song";
        trash.addEventListener('click', async f => {
            let response = await fetch(api + "Songs/" + this.ID, { method: 'DELETE' });
            if(response.ok){
                let data = await response.text();
                alert(data);

                songDiv.remove();
            }
            else{
                let data = await response.text();
                alert(data);
            }
        })
        songDiv.appendChild(trash);

        songsDiv.appendChild(songDiv);
    }

    edit(){
	// code for generating a song edit line�
    }

}