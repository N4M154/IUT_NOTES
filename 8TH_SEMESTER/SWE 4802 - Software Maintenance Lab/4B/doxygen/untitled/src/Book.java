/**
 * @brief Represents a single book in the library catalog.
 *
 * Stores basic bibliographic details and tracks whether the
 * book is currently checked out.
 */
public class Book {

    private String title;
    private String author;
    private String isbn;
    private boolean checkedOut;

    /**
     * @brief Constructs a new Book.
     * @param title  the book's title
     * @param author the book's author
     * @param isbn   the book's ISBN number
     */
    public Book(String title, String author, String isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.checkedOut = false;
    }

    /** @return the title of the book */
    public String getTitle() {
        return title;
    }

    /** @return the author of the book */
    public String getAuthor() {
        return author;
    }

    /** @return the ISBN of the book */
    public String getIsbn() {
        return isbn;
    }

    /** @return true if the book is currently checked out */
    public boolean isCheckedOut() {
        return checkedOut;
    }

    /**
     * @brief Marks the book as checked out.
     */
    public void checkOut() {
        checkedOut = true;
    }

    /**
     * @brief Marks the book as returned/available.
     */
    public void returnBook() {
        checkedOut = false;
    }

    /**
     * @brief Builds a human-readable summary of the book.
     *
     * NOTE: this method duplicates formatting logic that also
     * appears in Library.printCatalog() -- a good refactoring
     * target in IntelliJ (Extract Method / reuse this instead).
     *
     * @return formatted string with title, author, and status
     */
    public String describe() {
        String status = checkedOut ? "CHECKED OUT" : "AVAILABLE";
        return title + " by " + author + " [" + status + "]";
    }
}