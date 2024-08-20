import {User} from "./types";

export const findUser = (users: User[], id: string) => {
    const user = users.filter((user) => {
        return user.id === id
    });

    console.log(user);
}