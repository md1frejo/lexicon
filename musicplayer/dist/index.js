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
        id: 4,
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
        title: "Never Give You Up",
        artist: "Rick Astley",
        durationInSeconds: 200,
        album: {
            title: "Whenever You Need Somebody",
            year: 1987,
        },
    },
];
// VARIABLER
const songTitleElement = document.getElementById("song-title");
const songArtistElement = document.getElementById("song-artist");
const coverImageElement = document.getElementById("cover-img");
const dialog = document.querySelector("#menu-dialog");
const searchInput = document.querySelector("#search-input");
const searchAlbum = document.querySelector("#search-album");
const searchBand = document.querySelector("#search-band");
const songListContainer = document.querySelector("#song-list-container");
const playButton = document.querySelector("#play-btn");
let status = "paused";
// LOGIK
playlist.forEach((song) => {
    const card = document.createElement("article");
    card.classList.add("song-card");
    const title = document.createElement("h3");
    title.classList.add("song-title");
    title.textContent = song.title;
    const album = document.createElement("span");
    album.classList.add("album-title");
    album.textContent = song.album.title;
    const artist = document.createElement("span");
    artist.classList.add("artist-name");
    artist.textContent = song.artist;
    //  const title = document.createElement("h3");
    //  title.textContent = song.title;
    //  const artist = document.createElement("span");
    //  artist.textContent = song.artist;
    const duration = document.createElement("span");
    duration.textContent = song.durationInSeconds.toString();
    const year = document.createElement("span");
    year.textContent = song.album.year.toString();
    //const album = document.createElement("span");
    //album.textContent = song.album.title
    card.append(title, artist, duration, year, album);
    if (songListContainer) {
        card.addEventListener("click", () => {
            const currentActive = document.querySelector(".song-card.active");
            if (currentActive) {
                currentActive.classList.remove("active");
            }
            card.classList.add("active");
            playSong(song);
        });
        songListContainer.append(card);
    }
});
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
    searchInput.addEventListener("input", (e) => {
        const target = e.target;
        const searchTerm = target.value.toLowerCase();
        const allCard = document.querySelectorAll(".song-card");
        allCard.forEach((card) => {
            //  const title = card.querySelector("h3")?.textContent?.toLowerCase();
            const title = card.querySelector(".song-title")?.textContent?.toLowerCase();
            if (title?.includes(searchTerm)) {
                console.log(title);
                card.classList.remove("hidden");
            }
            else {
                card.classList.add("hidden");
            }
        });
    });
}
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
        const matches = mode === "AND"
            ? (!titleQuery || titleMatch) &&
                (!albumQuery || albumMatch) &&
                (!artistQuery || artistMatch)
            : titleMatch || albumMatch || artistMatch;
        card.classList.toggle("hidden", !matches);
    });
}
export {};
//# sourceMappingURL=index.js.map