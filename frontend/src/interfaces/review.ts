export interface Review {
  anime: string,
  review: string,
  reviewerId: string,
  reviewer: { username: string, picture: string },
  upvotesCount: number
}
