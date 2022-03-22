import { Artist } from "./Artist.js";

export class ConcertLink{
    constructor(ID, ConcertID, ArtistID){
        this.ID = ID;
        this.ConcertID = ConcertID;
        this.ArtistID = ArtistID;
    }

    async getArtist(){
        let response = await fetch("https://localhost:5001/api/Artists/" + this.ArtistID);
        let data = await response.json();
        let artist = new Artist(data.id, data.name, data.description, data.image, data.artistType, data.startDate, data.endDate, data.youtube, data.spotify);
        return artist;
    }
    async getConcert(){
        let response = await fetch("https://localhost:5001/api/Concerts/Single" + this.ConcertID);
        let data = await response.json();
        let concert = new Concert(data.id, data.name, data.description, data.image, data.artistType, data.startDate, data.endDate, data.youtube, data.spotify);
        return concert;
    }
}