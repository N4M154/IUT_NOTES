/**
 * @brief Entry point that demonstrates the Library system end to end.
 */
public class Main {

    /**
     * @brief Runs a small demo: adds books/members, checks a book out,
     * prints the catalog, then returns the book.
     * @param args unused command-line arguments
     */
    public static void main(String[] args) {
        Library library = new Library();

        library.addBook(new Book("Clean Code", "Robert C. Martin", "111"));
        library.addBook(new Book("The Pragmatic Programmer", "Andrew Hunt", "222"));
        library.addBook(new Book("Refactoring", "Martin Fowler", "333"));

        library.addMember(new Member("Alice", 1));
        library.addMember(new Member("Bob", 2));

        library.printCatalog();

        library.checkOutBook("111", 1);
        library.checkOutBook("111", 2); // should fail: already checked out

        library.printCatalog();

        library.returnBook("111", 1);

        library.printCatalog();
    }
}