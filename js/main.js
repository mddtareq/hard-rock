const searchSong = document.getElementById('search-song');
const search = document.getElementById('search-button');
const buttonLyrics = document.getElementById('btn-lyrics');
const hideLyrics = document.getElementById('hide-lyrics');
const songTitle = document.getElementById('song-title');
const albumTitle = document.getElementById('album-title');
const artist = document.getElementById('artist');
const resultsArea = document.getElementById('show-results');
const preview = document.getElementById('preview');
const showLyrics = document.getElementById('lyrics');
const showLyricsTitle = document.getElementById('lyrics-title');
const showLyricsArtist = document.getElementById('lyrics-artist');
const lyricsArea = document.getElementById('lyrics-area');

resultsArea.style.display = 'none';
hideLyrics.style.display='none';

search.addEventListener('click', function (event) {
    lyricsArea.style.display = 'none';
    hideLyrics.style.display='none';
    buttonLyrics.style.display='block';
    const searchResult = searchSong.value;
    if (searchResult != "") {
        //     fetch(`https://api.lyrics.ovh/suggest/${searchResult}`)
        // .then(response=>response.json())
        // .then(data=>{
        //     showResults(data)
        // })
        getResults(searchResult);
    }
    else{
        resultsArea.style.display = 'none';
    }

})

buttonLyrics.addEventListener('click', function (event) {
    buttonLyrics.style.display='none';
    hideLyrics.style.display='block';
    lyricsArea.style.display = 'block';
    getLyrics();
})

hideLyrics.addEventListener('click', function (event) {
    hideLyrics.style.display='none';
    lyricsArea.style.display = 'none';
    buttonLyrics.style.display='block';
})

async function getResults(searchResult) {
    const response = await fetch(`https://api.lyrics.ovh/suggest/${searchResult}`)
    const data = await response.json();
    showResults(data);
}

async function getLyrics() {
    const singer = artist.innerText;
    const title = songTitle.innerText;
    
    const response = await fetch(`https://api.lyrics.ovh/v1/${singer}/${title}}`)
    const lyrics = await response.json();
    console.log(response.status);
    if (response.status===200) {
        showLyricsTitle.innerText = title;
        showLyricsArtist.innerText = singer;
        showLyrics.innerText = lyrics.lyrics;
        showLyrics.style.fontSize='medium';
    }
    else{
        showLyricsTitle.innerText = "";
        showLyricsArtist.innerText = "";
        showLyrics.innerText = "No Lyrics Found";
        showLyrics.style.fontSize='x-large';
    }

}

function showResults(data) {
    const length = data.data.length;
    if (length > 0) {
        for (let i = 0; i < length; i++) {
            if (i < 5) {
                resultsArea.style.display = 'block';
                songTitle.innerText = data.data[i].title;
                albumTitle.innerText = data.data[i].album.title;
                artist.innerText = data.data[i].artist.name;
                preview.src = data.data[i].preview;
                preview.style.outline = 'none';
            }
        }
    }
}