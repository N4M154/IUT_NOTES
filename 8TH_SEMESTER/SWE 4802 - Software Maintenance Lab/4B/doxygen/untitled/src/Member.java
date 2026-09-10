import java.util.ArrayList;
import java.util.List;

/**
 * @brief Represents a library member who can borrow books.
 */
public class Member {

    private String name;
    private int memberId;
    private List<Book> borrowedBooks;

    /**
     * @brief Constructs a new Member.
     * @param name     the member's full name
     * @param memberId a unique numeric identifier for the member
     */
    public Member(String name, int memberId) {
        this.name = name;
        this.memberId = memberId;
        this.borrowedBooks = new ArrayList<>();
    }

    /** @return the member's name */
    public String getName() {
        return name;
    }

    /** @return the member's ID */
    public int getMemberId() {
        return memberId;
    }

    /** @return the list of books currently borrowed by this member */
    public List<Book> getBorrowedBooks() {
        return borrowedBooks;
    }

    /**
     * @brief Adds a book to this member's borrowed list.
     * @param book the book being borrowed
     */
    public void borrow(Book book) {
        borrowedBooks.add(book);
    }

    /**
     * @brief Removes a book from this member's borrowed list.
     * @param book the book being returned
     */
    public void giveBack(Book book) {
        borrowedBooks.remove(book);
    }
}