import { useEffect, useState } from "react";

export default function Home({ currentUser, onLogout }) {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedYear: "",
    genre: "",
    availableCopies: "",
  });
  const [newBookData, setNewBookData] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedYear: "",
    genre: "",
    availableCopies: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch("http://localhost:3001/book")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => {
        console.error("Failed to fetch books:", err);
      });
  };

  const handleDelete = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      fetch(`http://localhost:3001/book/${bookId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            fetchBooks();
          } else {
            console.error("Failed to delete book");
          }
        })
        .catch((err) => {
          console.error("Error deleting book:", err);
        });
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book._id);
    setEditFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publishedYear: book.publishedYear,
      genre: book.genre,
      availableCopies: book.availableCopies,
    });
  };

  const handleInputChange = (e, isNewBook = false) => {
    const { name, value } = e.target;
    if (isNewBook) {
      setNewBookData({
        ...newBookData,
        [name]: value,
      });
    } else {
      setEditFormData({
        ...editFormData,
        [name]: value,
      });
    }
  };

  const handleEditSubmit = (bookId) => {
    fetch(`http://localhost:3001/book/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFormData),
    })
      .then((res) => res.json())
      .then(() => {
        setEditingBook(null);
        fetchBooks();
      })
      .catch((err) => {
        console.error("Error updating book:", err);
      });
  };

  const handleAddBook = () => {
    fetch("http://localhost:3001/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBookData),
    })
      .then((res) => res.json())
      .then(() => {
        setShowAddForm(false);
        setNewBookData({
          title: "",
          author: "",
          isbn: "",
          publishedYear: "",
          genre: "",
          availableCopies: "",
        });
        fetchBooks();
      })
      .catch((err) => {
        console.error("Error adding book:", err);
      });
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setNewBookData({
      title: "",
      author: "",
      isbn: "",
      publishedYear: "",
      genre: "",
      availableCopies: "",
    });
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div>
      <div>
        <h2>Welcome, {currentUser?.name}!</h2>
        <p>Email: {currentUser?.email}</p>
        <p>Age: {currentUser?.age}</p>
        <p>Phone Number: {currentUser?.phone}</p>
        <button onClick={handleLogout}>Log Out</button>
      </div>

      <div>
        <h1>All Books</h1>
        <button onClick={() => setShowAddForm(true)}>Add New Book</button>
      </div>

      {showAddForm && (
        <div>
          <h2>Add New Book</h2>
          <div>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={newBookData.title}
                onChange={(e) => handleInputChange(e, true)}
              />
            </div>
            <div>
              <label>Author:</label>
              <input
                type="text"
                name="author"
                value={newBookData.author}
                onChange={(e) => handleInputChange(e, true)}
              />
            </div>
            <div>
              <label>ISBN:</label>
              <input
                type="text"
                name="isbn"
                value={newBookData.isbn}
                onChange={(e) => handleInputChange(e, true)}
              />
            </div>
            <div>
              <label>Published Year:</label>
              <input
                type="number"
                name="publishedYear"
                value={newBookData.publishedYear}
                onChange={(e) => handleInputChange(e, true)}
              />
            </div>
            <div>
              <label>Genre:</label>
              <input
                type="text"
                name="genre"
                value={newBookData.genre}
                onChange={(e) => handleInputChange(e, true)}
              />
            </div>
            <div>
              <label>Available Copies:</label>
              <input
                type="number"
                name="availableCopies"
                value={newBookData.availableCopies}
                onChange={(e) => handleInputChange(e, true)}
              />
            </div>
          </div>
          <div>
            <button onClick={handleAddBook}>Save</button>
            <button onClick={handleCancelAdd}>Cancel</button>
          </div>
        </div>
      )}

      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Year</th>
              <th>ISBN</th>
              <th>Copies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                {editingBook === book._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="title"
                        value={editFormData.title}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="author"
                        value={editFormData.author}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="genre"
                        value={editFormData.genre}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="publishedYear"
                        value={editFormData.publishedYear}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="isbn"
                        value={editFormData.isbn}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="availableCopies"
                        value={editFormData.availableCopies}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleEditSubmit(book._id)}>
                        Save
                      </button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.publishedYear}</td>
                    <td>{book.isbn}</td>
                    <td>{book.availableCopies}</td>
                    <td>
                      <button onClick={() => handleEdit(book)}>Edit</button>
                      <button onClick={() => handleDelete(book._id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// -_- N4M154 -_-
