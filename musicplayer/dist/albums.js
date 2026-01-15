console.log("albums");
const artits = ["william orbit", "front 242", "metallica", "slayer", "orbital", "kyuss"];
const titles = ["myoracle lives uptown", "lovley day", "one", "war ensemble", "in dub", "blues for the red sun"];
const ids = [1, 2, 3, 4, 5, 6];
const durations = [12, 34, 5, 678, 9, 9];
const allarts = [artits, titles, ids];
//function gensongs(dbase:[string[], string[], number[]]):[song] 
//    return dbase.map(x => x[0])
//}
const playList = [
    {
        id: 1,
        title: "my oracle lives uptown",
        artist: "william orbit",
        duration: 3232,
        album: {
            atitle: "my oracle lives uptown",
            year: 2006,
        }
    },
    {
        id: 2,
        title: "lovly day",
        artist: "front 242",
        duration: 332,
        album: {
            atitle: "no comment",
            year: 1987,
        },
    },
    {
        id: 3,
        title: "one",
        artist: "metallica",
        duration: 332,
        album: {
            atitle: "and justice for all",
            year: 1988,
        },
    },
    {
        id: 4,
        title: "war ensemble",
        artist: "slayer2",
        duration: 632,
        album: {
            atitle: "seasobs in the abyss",
            year: 1990,
        },
    }
];
console.log(allarts.map(x => x[0]));
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const songDura = document.getElementById("song-duration");
const songYear = document.getElementById("song-aitle");
const songListContainer = document.querySelector("song-list-container");
// funktioner
function playSong(song) {
    if (songTitle) {
        songTitle.textContent = song.title;
    }
    if (songArtist) {
        songArtist.textContent = song.artist;
    }
}
// logik
playList.forEach((song) => {
    const card = document.createElement("article");
    card.classList.add("song-card");
    const title = document.createElement("h3");
    title.textContent = song.title;
    const artist = document.createElement("span");
    artist.textContent = song.artist;
    card.append(title, artist);
    if (songListContainer) {
        card.addEventListener("click", () => {
            const currrentActive = document.querySelector(".song-card.active");
            if (currrentActive) {
                currrentActive.classList.remove("active");
            }
            card.classList.add("active");
            playSong(song);
        });
    }
});
console.log("so far so good");
export {};
//# sourceMappingURL=albums.js.map