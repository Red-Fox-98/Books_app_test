import "./styles.css";
import {Book, BookInformation, Review, ReviewInformation, User} from "./lib/types";
import {getBooks, getUsers, getReviews} from "./lib/api";
import {useEffect, useState, FC} from "react";
import Card from "./Card";
import {getReviewInformation, getUser} from "./lib/helpers";

// Техническое задание:
// Доработать приложение App, чтобы в отрисованном списке
// были реальные отзывы, автор книги и автор отзыва.
// Данные об отзывах и пользователях можно получить при помощи асинхронных
// функций getUsers, getReviews

// функция getBooks возвращает Promise<Book[]>
// функция getUsers возвращает Promise<User[]>
// функция getReviews возвращает Promise<Review[]>

// В объектах реализующих интерфейс Book указаны только uuid
// пользователей и обзоров

// // В объектах реализующих интерфейс BookInformation, ReviewInformation
// указана полная информация об пользователе и обзоре.

const toBookInformation = (book: Book, users: User[], reviews: Review[]): BookInformation => {
    const dataAuthor = getUser(users, book.authorId);
    const dataReviews = getReviewInformation(users, reviews, book.reviewIds);

    return {
        id: book.id,
        name: book.name || "Книга без названия",
        author: {name: dataAuthor?.name, id: dataAuthor?.id},
        reviews: dataReviews,
        description: book.description
    };
};

const App: FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [users, setUser] = useState<User[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);
            const fetchedBooks = await getBooks();
            const fetchedUsers = await getUsers();
            const fetchedReviews = await getReviews();

            setBooks(fetchedBooks);
            setUser(fetchedUsers);
            setReviews(fetchedReviews);

            setIsLoading(false);
        };
        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Мои книги:</h1>
            {isLoading && <div>Загрузка...</div>}
            {!isLoading &&
                books.map((b) => <Card key={b.id} book={toBookInformation(b, users, reviews)}/>)}
        </div>
    );
};

export default App;
