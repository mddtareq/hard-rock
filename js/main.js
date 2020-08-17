const searchSong = document.getElementById('search-song');
const search = document.getElementById('search-button');
const showLyrics = document.getElementById('lyrics');
const showLyricsTitle = document.getElementById('lyrics-title');
const showLyricsArtist = document.getElementById('lyrics-artist');
const lyricsArea = document.getElementById('lyrics-area');
//lyricsArea.style.display = 'none';


search.addEventListener('click', function (event) {
    document.getElementById('inject').innerHTML="";
    document.getElementById('lyrics-show').innerHTML="";
    const searchResult = searchSong.value;
    if (searchResult != "") {
        getResults(searchResult);
    }
})


async function getResults(searchResult) {
    const response = await fetch(`https://api.lyrics.ovh/suggest/${searchResult}`)
    const data = await response.json();
    showResults(data);
}

function showResults(data) {
    const length = data.data.length;
    if (length > 0) {
        for (let i = 0; i < length; i++) {
            if (i < 10) {
                const title = data.data[i].title;
                const artist = data.data[i].artist.name;
                const albumTitle = data.data[i].album.title;
                const preview = data.data[i].preview;
                const picture= data.data[i].artist.picture_small;
                const parent = document.getElementById('inject');
                const create = document.createElement('p');
                create.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9 col-9 d-flex justify-content-start align-self-center">
                <img src="${picture}" width="100" height="120" alt="">
                    <div class="pic">
                    <h3 id="song-title" class="lyrics-name">${title}</h3>

                    <p class="author lead"> <span id="album-title">${albumTitle}</span> by <span id="artist">${artist}</span></p>
                    <audio class="audio" controls style="width: 250px; height:30px">
                    <source src="${preview}" type="audio/mp3">
                    </audio>
                    </div>
                </div>
                <div class="col-md-3 col-3 text-md-right text-center">
                    <button id="btn-lyric" onclick="myFunction('${artist}','${title}')" class=" try btn btn-success">Get Lyrics</button>
                </div>
            </div>`
                parent.appendChild(create);
            }
        }
    }
}

async function myFunction(artist, title) {
    document.getElementById('lyrics-show').innerHTML="";
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    const lyrics = await response.json();
    const parent = document.getElementById('lyrics-show');
    const create = document.createElement('p');
    const songLyrics=lyrics.lyrics;
    if(response.status===200){
    create.innerHTML += `
    <div id="lyrics-area" class="lyrics">
    <br>
    <h2 id="lyrics-title">${title}</h2>
    <h4 id="lyrics-artist">${artist}</h4>
    <br>
    <p id="lyrics">${songLyrics.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
    <br>
    </div>`
    }
    else{
    create.innerHTML += `
    <div id="lyrics-area" class="lyrics">    
    <br>
    <h2 id="lyrics-title"></h2>
    <h4 id="lyrics-artist"></h4>
    <br>
    <p id="lyrics">${"No Lyrics Found"}</p>
    <br>
    </div>`
    }
    parent.appendChild(create);
};