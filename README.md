# iQMusic
Welcome to iQMusic. It's a 2-part web app, consisting of `.NET 5` Web API and vanilla html-css-javascript for frontend. Web API is used strictly for data interactions only.

## Main Page
On the main page you will be greeted with three sections. Albums, Artists and Concerts page. Each filled with relevant content. Click on one of the pictures open their respective page, with relevant data. Each section has its own page, and maximum number of elements per page is set to 20. You can access the page for creating a new object by clicking the `+` sign next to the relative section label.  
<center>
  <img src="https://cdn.discordapp.com/attachments/938941717049135177/955811960505638912/unknown.png">
</center>

## Album Page
Album page consists of album datails and its featured songs. One song can have only one album, while the album can have an unlimited number of songs. There's a textbox below the songs for adding new songs to the list.  
<center>
  <img src="https://cdn.discordapp.com/attachments/938941717049135177/955812027568361502/unknown.png">
</center>

## Artist Page
Artist page consists of artist details and its featured albums. One album can have only one artist, while the artist can have an unlimited number of albums. Clicking on an album redirects you to the respective album's page.  
<center>
  <img src="https://cdn.discordapp.com/attachments/938941717049135177/955812082153062430/unknown.png">
</center>

## Concert Page
Concert page consists of concert details and featured artist that will participate. An artist can have many concerts, and a concert can have many artists. There's a textbox below the artists for adding and removing the featured artists from the list.  
<center>
  <img src="https://cdn.discordapp.com/attachments/938941717049135177/955812163132477460/unknown.png">
</center>
