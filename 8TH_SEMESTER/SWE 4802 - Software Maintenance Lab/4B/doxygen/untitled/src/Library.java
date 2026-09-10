import java.util.ArrayList;
import java.util.List;

/**
 * @brief Central class that manages the book catalog and members,
 * and handles checkout/return operations.
 */
public class Library {

    private List<Book> catalog;
    private List<Member> members;

    /**
     * @brief Constructs an empty Library.
     */
    public Library() {
        catalog = new ArrayList<>();
        members = new ArrayList<>();
    }

    /**
     * @brief Adds a new book to the catalog.
     * @param book the book to add
     */
    public void addBook(Book book) {
        catalog.add(book);
    }

    /**
     * @brief Registers a new member with the library.
     * @param member the member to register
     */
    public void addMember(Member member) {
        members.add(member);
    }

    /**
     * @brief Attempts to check out a book for a member, identified by ISBN.
     *
     * NOTE: this method is intentionally long and does several jobs at
     * once (lookup + validation + state change + printing). It's a good
     * candidate for IntelliJ's "Extract Method" refactoring -- split it
     * into findBookByIsbn(), and a separate print/notify step.
     *
     * @param isbn     ISBN of the book to check out
     * @param memberId ID of the member checking out the book
     */
    public void checkOutBook(String isbn, int memberId) {
        Book foundBook = null;
        for (int i = 0; i < catalog.size(); i++) {
            if (catalog.get(i).getIsbn().equals(isbn)) {
                foundBook = catalog.get(i);
                break;
            }
        }

        Member foundMember = null;
        for (int i = 0; i < members.size(); i++) {
            if (members.get(i).getMemberId() == memberId) {
                foundMember = members.get(i);
                break;
            }
        }

        if (foundBook == null) {
            System.out.println("Error: book not found for ISBN " + isbn);
            return;
        }
        if (foundMember == null) {
            System.out.println("Error: member not found for ID " + memberId);
            return;
        }
        if (foundBook.isCheckedOut()) {
            System.out.println("Error: '" + foundBook.getTitle() + "' is already checked out.");
            return;
        }

        foundBook.checkOut();
        foundMember.borrow(foundBook);
        System.out.println(foundMember.getName() + " checked out: " + foundBook.getTitle());
    }

    /**
     * @brief Returns a previously checked-out book back to the catalog.
     * @param isbn     ISBN of the book being returned
     * @param memberId ID of the member returning the book
     */
    public void returnBook(String isbn, int memberId) {
        Book foundBook = null;
        for (Book b : catalog) {
            if (b.getIsbn().equals(isbn)) {
                foundBook = b;
                break;
            }
        }
        Member foundMember = null;
        for (Member m : members) {
            if (m.getMemberId() == memberId) {
                foundMember = m;
                break;
            }
        }
        if (foundBook == null || foundMember == null) {
            System.out.println("Error: could not process return.");
            return;
        }
        foundBook.returnBook();
        foundMember.giveBack(foundBook);
        System.out.println(foundMember.getName() + " returned: " + foundBook.getTitle());
    }

    /**
     * @brief Prints the full catalog with each book's status.
     *
     * NOTE: this duplicates the formatting logic in Book.describe().
     * A cleaner design just calls book.describe() here instead of
     * rebuilding the string -- try this as an IntelliJ refactor.
     */
    public void printCatalog() {
        System.out.println("=== Library Catalog ===");
        for (Book b : catalog) {
            String status = b.isCheckedOut() ? "CHECKED OUT" : "AVAILABLE";
            System.out.println(b.getTitle() + " by " + b.getAuthor() + " [" + status + "]");
        }
    }
}