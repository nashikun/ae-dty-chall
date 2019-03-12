export interface Review {
    id: string,
    anime: string
    review: string,
    reviewer: { user: string, username: string, picture: string },
    upvoters: string[],
    upvotesCount: number,
    upvoted: boolean
}
