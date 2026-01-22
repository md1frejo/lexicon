export interface Song {
    id: number;
    title: string;
    artist: string;
    durationInSeconds: number;
    album: Album;
}
export interface Album {
    title: string;
    year: number;
    coverUrl?: string;
}
//# sourceMappingURL=interf.d.ts.map