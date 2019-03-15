export interface Anime {
    _id: string;
    seq_anime: number
    name: string,
    description: string,
    episodes: string,
    image: string,
    score: string,
    rating: { _id: string, rating: string };
    status: string,
    watchedEpisodes: string
    // rating and episodes are strings instead of numbers because they are inputs (expected behavior)
    // will
}
