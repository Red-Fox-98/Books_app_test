import {Review, ReviewInformation, User} from "./lib/types";

export const getUser = (users: User[], id: string): User => {
    return users.filter(user => {
        return user.id === id
    })[0];
}

export const getReviewInformation = (users: User[], reviews: Review[], ids: string[]): ReviewInformation[] => {
    let dataReview: Review[] = [];
    for (const id of ids) {
        dataReview = reviews.filter((review) => {
            return review.id === id
        })
    }

    return dataReview.map((review): ReviewInformation => {
        return {
            id: review.id,
            user: getUser(users, review.userId),
            text: review.text
        }
    });
}