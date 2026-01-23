import type {Song} from "../models/interf"

export const playlist: Song[] = [
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
