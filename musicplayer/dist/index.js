// array with songs
const playlist = [
    {
        id: 1,
        title: "Bohemian Rhapsody",
        artist: "Queen",
        durationInSeconds: 320,
        album: {
            title: "A night at the Opera",
            year: 1975,
            coverUrl: "https://example.com/queen.jpg",
        },
    },
    {
        id: 2,
        title: "Blinding Lights",
        artist: "The Weeknd",
        durationInSeconds: 200,
        album: {
            title: "After Hours",
            year: 2020,
            coverUrl: "https://example.com/weeknd.jpg",
        },
    },
    {
        id: 3,
        title: "Africa",
        artist: "Toto",
        durationInSeconds: 300,
        album: {
            title: "Toto IV",
            year: 1982,
        },
    },
    {
        id: 4,
        title: "Lovley day",
        artist: "fron 242",
        durationInSeconds: 300,
        album: {
            title: "no comment",
            year: 1985,
        },
    },
    {
        id: 5,
        title: "Africa",
        artist: "Toto",
        durationInSeconds: 300,
        album: {
            title: "Toto IV",
            year: 1982,
        },
    },
    {
        id: 7,
        title: "Never Give You Up",
        artist: "Rick Astley",
        durationInSeconds: 200,
        album: {
            title: "Whenever You Need Somebody",
            year: 1987,
        },
    },
];
// json reading 
const readjson = async () => {
    const res = await fetch("./mlib.json");
    const data = await res.json();
    console.log("data: ", data);
    playlist.length = 0;
    playlist.push(...data);
    console.log("pl2: ", playlist);
    renderSongs();
};
// VARIABLER
const songTitleElement = document.getElementById("song-title");
const songArtistElement = document.getElementById("song-artist");
const coverImageElement = document.getElementById("cover-img");
const dialog = document.querySelector("#menu-dialog");
const addform = document.querySelector("#menu-form");
const getartist = document.querySelector("#add-artist");
const getalbum = document.querySelector("#add-album");
const getsong = document.querySelector("#add-song");
// get search field
const searchInput = document.querySelector("#search-input");
const searchAlbum = document.querySelector("#search-album");
const searchBand = document.querySelector("#search-band");
const songListContainer = document.querySelector("#song-list-container");
const playButton = document.querySelector("#play-btn");
let status = "paused";
// LOGIK
function renderSongs() {
    if (!songListContainer)
        return;
    songListContainer.replaceChildren();
    playlist.forEach(({ title, artist, album, id }) => {
        const card = document.createElement("article");
        card.classList.add("song-card");
        card.dataset.id = id.toString();
        const titleElement = document.createElement("h3");
        titleElement.classList.add("song-title");
        titleElement.textContent = title;
        const artistElement = document.createElement("span");
        artistElement.classList.add("artist-name");
        artistElement.textContent = artist;
        const albumElement = document.createElement("span");
        albumElement.classList.add("album-title");
        albumElement.textContent = album.title;
        card.append(titleElement, artistElement, albumElement);
        songListContainer.append(card);
    });
}
if (playButton) {
    playButton.addEventListener("click", () => {
        const iconElement = playButton.querySelector("span");
        if (status === "paused") {
            status = "playing";
            if (iconElement) {
                iconElement.textContent = "pause";
            }
        }
        else {
            status = "paused";
        }
        if (iconElement) {
            iconElement.textContent = "play_arrow";
        }
    });
}
if (searchInput) {
    console.log(searchInput);
    searchInput.addEventListener("input", (e) => {
        const target = e.target;
        const searchTerm = target.value.toLowerCase();
        console.log(target);
        const allCard = document.querySelectorAll(".song-card");
        console.log(allCard);
        allCard.forEach((card) => {
            //  const title = card.querySelector("h3")?.textContent?.toLowerCase();
            const title = card.querySelector(".song-title")?.textContent?.toLowerCase();
            if (title?.includes(searchTerm)) {
                card.classList.remove("hidden");
            }
            else {
                card.classList.add("hidden");
            }
        });
    });
}
// search clauses
if (searchAlbum) {
    searchAlbum.addEventListener("input", (e) => {
        const target = e.target;
        const searchTerm = target.value.toLowerCase();
        const allCard = document.querySelectorAll(".song-card");
        allCard.forEach((card) => {
            //  const album = card.querySelector("h3")?.textContent?.toLowerCase();
            const album = card.querySelector(".album-title")?.textContent?.toLowerCase();
            if (album?.includes(searchTerm)) {
                console.log("album: " + album);
                card.classList.remove("hidden");
            }
            else {
                card.classList.add("hidden");
            }
        });
    });
}
if (searchBand) {
    searchBand.addEventListener("input", (e) => {
        const target = e.target;
        const searchTerm = target.value.toLowerCase();
        const allCard = document.querySelectorAll(".song-card");
        allCard.forEach((card) => {
            //  const band = card.querySelector("h3")?.textContent?.toLowerCase();
            const band = card.querySelector(".artist-name")?.textContent?.toLowerCase();
            if (band?.includes(searchTerm)) {
                card.classList.remove("hidden");
            }
            else {
                card.classList.add("hidden");
            }
        });
    });
}
// FUNKTIONER
const toggleBtn = document.getElementById("menu-toggle");
toggleBtn?.addEventListener("click", () => {
    if (!dialog.open) {
        dialog.showModal();
    }
});
function playSong(song) {
    if (songTitleElement) {
        songTitleElement.textContent = song.title;
    }
    if (songArtistElement) {
        songArtistElement.textContent = song.artist;
    }
}
function filterCards(titleQuery, albumQuery, artistQuery, mode) {
    const cards = document.querySelectorAll(".song-card");
    cards.forEach((card) => {
        const title = card.querySelector(".song-title")?.textContent?.toLowerCase() ?? "";
        const album = card.querySelector(".album-title")?.textContent?.toLowerCase() ?? "";
        const artist = card.querySelector(".artist-name")?.textContent?.toLowerCase() ?? "";
        const titleMatch = titleQuery ? title.includes(titleQuery) : false;
        const albumMatch = albumQuery ? album.includes(albumQuery) : false;
        const artistMatch = artistQuery ? artist.includes(artistQuery) : false;
        const matches = mode === "AND" ? (!titleQuery || titleMatch) && (!albumQuery || albumMatch) && (!artistQuery || artistMatch) : titleMatch || albumMatch || artistMatch;
        card.classList.toggle("hidden", !matches);
    });
}
addform?.addEventListener("submit", (e) => {
    e.preventDefault();
    const addSong = {
        id: Date.now(),
        title: getsong.value,
        artist: getartist.value,
        durationInSeconds: 300,
        album: {
            title: getalbum.value,
            year: new Date().getFullYear(),
        },
    };
    playlist.push(addSong);
    renderSongs();
    addform.reset();
    dialog.close();
});
document.addEventListener("DOMContentLoaded", () => {
    readjson();
    renderSongs();
});
export {};
//# sourceMappingURL=index.js.map