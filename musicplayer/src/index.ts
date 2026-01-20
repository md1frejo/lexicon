// Interfaces/Typer
interface Song {
  id: number;
  title: string;
  artist: string;
  durationInSeconds: number;
  album: Album;
}

interface Album {
  title: string;
  year: number;
  coverUrl?: string;
}

type PlayerStatus = "playing" | "paused" | "stopped";

// array with songs
const playlist: Song[] = [
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
const coverImageElement = document.getElementById("cover-img") as HTMLImageElement;

const dialog = document.querySelector("#menu-dialog") as HTMLDialogElement;  
const addform = document.querySelector("#menu-form") as HTMLFormElement;
const getartist = document.querySelector("#artist") as HTMLInputElement;
const getalbum = document.querySelector("#album") as HTMLInputElement;
const getsong = document.querySelector("#song") as HTMLInputElement;

// get search field
const searchInput = document.querySelector("#search-input") as HTMLInputElement;
const searchAlbum = document.querySelector("#search-album") as HTMLInputElement;
const searchBand = document.querySelector("#search-band") as HTMLInputElement;

const songListContainer = document.querySelector("#song-list-container");
const playButton = document.querySelector("#play-btn") as HTMLButtonElement;
let status: PlayerStatus = "paused";

// LOGIK

function renderSongs() {
  // if full empty songlistcontainer
  if (songListContainer) {
    songListContainer.replaceChildren(); 
  }
  
  playlist.forEach(({title, artist, id}) => {

    // new music card
    const card = document.createElement("article");
    card.classList.add("song-card");

    card.dataset.id = id.toString();

    // create element and set its text content
    const titleElement = document.createElement("h3");
    titleElement.textContent=title

    const artistElement = document.createElement("span");
    artistElement.textContent = artist;

   // album.classList.add("album-title");
   // album.textContent = song.album.title;

   // const artist = document.createElement("span");

    card.append(titleElement, artistElement);

    //artist.classList.add("artist-name");
   // artist.textContent = song.artist;

    //const duration = document.createElement("span");
    //duration.textContent = song.durationInSeconds.toString()

    //const year = document.createElement("span");
    //year.textContent = song.album.year.toString()

    card.append(titleElement,artistElement);

    if (songListContainer) {
      songListContainer.append(card)
    }

 //   songListContainer.addEventListener("click", (e) => {
 //     const target = e.target as HTMLElement;
 //     const card = target.closest(".song-card") as HTMLElement;

 //     if(!card) return;

 //     const idsr = card.dataset.id;
 //     const currentActive = document.querySelector("song-card.active");

 //     if(currentActive) currentActive.classList.remove("active")

 //     playSong(id)

  })
}
  


//  if (songListContainer) {
//    card.addEventListener("click", () => {
//      const currentActive = document.querySelector(".song-card.active");
//      if (currentActive) {
//        currentActive.classList.remove("active");
//      }
//      card.classList.add("active");
//      playSong(song);
//    });

//    songListContainer.append(card);
//  }
//});
//}

if (playButton) {
  playButton.addEventListener("click", () => {
    const iconElement = playButton.querySelector("span");

    if (status === "paused") {
      status = "playing";

      if (iconElement) {
        iconElement.textContent = "pause";
      }
    } else {
      status = "paused";
    }
    if (iconElement) {
      iconElement.textContent = "play_arrow";
    }
  });
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    const searchTerm = target.value.toLowerCase();

    const allCard = document.querySelectorAll(".song-card");

    allCard.forEach((card) => {

    //  const title = card.querySelector("h3")?.textContent?.toLowerCase();
      const title = card.querySelector(".song-title")?.textContent?.toLowerCase();

      if (title?.includes(searchTerm)) {
          console.log(title)
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
    const target = e.target as HTMLInputElement;
    const searchTerm = target.value.toLowerCase();

    const allCard = document.querySelectorAll(".song-card");

    allCard.forEach((card) => {
    //  const album = card.querySelector("h3")?.textContent?.toLowerCase();
      const album = card.querySelector(".album-title")?.textContent?.toLowerCase();
      if (album?.includes(searchTerm)) {
        console.log("album: "+album)
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
}

if (searchBand) {
  searchBand.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    const searchTerm = target.value.toLowerCase();

    const allCard = document.querySelectorAll(".song-card");
    
    allCard.forEach((card) => {
    //  const band = card.querySelector("h3")?.textContent?.toLowerCase();
      const band = card.querySelector(".artist-name")?.textContent?.toLowerCase();
      if (band?.includes(searchTerm)) {
        
        card.classList.remove("hidden");
      } else {
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

function playSong(song: Song) {
  if (songTitleElement) {
    songTitleElement.textContent = song.title;
  }

  if (songArtistElement) {
    songArtistElement.textContent = song.artist;
  }
}

function filterCards(
  titleQuery: string,
  albumQuery: string,
  artistQuery: string,
  mode: "AND" | "OR") {

  const cards = document.querySelectorAll(".song-card");

  cards.forEach((card) => {
    const title = card.querySelector(".song-title")?.textContent?.toLowerCase() ?? "";
    const album = card.querySelector(".album-title")?.textContent?.toLowerCase() ?? "";
    const artist = card.querySelector(".artist-name")?.textContent?.toLowerCase() ?? "";

    const titleMatch = titleQuery ? title.includes(titleQuery) : false;
    const albumMatch = albumQuery ? album.includes(albumQuery) : false;
    const artistMatch = artistQuery ? artist.includes(artistQuery) : false;

    const matches = mode === "AND" ? (!titleQuery || titleMatch) && (!albumQuery || albumMatch) && (!artistQuery || artistMatch): titleMatch || albumMatch || artistMatch;

    card.classList.toggle("hidden", !matches);
  });
}

addform?.addEventListener("submit", (e) => {
  e.preventDefault();

  const song = getsong.value;
  const artist = getartist.value;
  const album = getalbum.value;

  const addSong: Song = {
    id: 45,
    title: song,
    artist: artist,
    durationInSeconds: 300,
    album: { title: "Singel", year: 2024 },
  }

   playlist.push(addSong);
      renderSongs();
    addform.reset();
    dialog.close();
})

renderSongs();
