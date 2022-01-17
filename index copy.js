
const db = require('./database/index.js');

// console.log(db.books);
// console.log(db.authors);
// console.log(db.publications);
//Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

const express = require('express');

const app = express();
app.use(express.json());


// http://localhost:3000/
app.get("/", (req, res) => {
    return res.json({"WELCOME": `to my Backend Software for the Book Company`});
});

// http://localhost:3000/
app.get('/books', (req, res) => {

    const getAllBooks = db.books;
    return res.json(getAllBooks);
    // res.json(getAllBooks);
    // res.send(getAllBooks);
});



// http://localhost:3000/book-isbn/12345TWO
app.get("/book-isbn/:isbn", (req, res) => {
    // console.log(req.params);
    // const isbn = req.params.isbn; // We can also use as like this
    const { isbn } = req.params;

    // console.log(isbn);
    const getSpecificBook = db.books.filter((book) => book.ISBN === isbn);
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if (getSpecificBook.length === 0) {
        return res.json({ "error": `No Book found for the ISBN of ${isbn}` });
    }
    return res.json(getSpecificBook[0]);
});


// http://localhost:3000/book-category/programming
app.get("/book-category/:category", (req, res) => {
    // console.log(req.params);
    const { category } = req.params;
    // console.log(category);
    const getSpecificBooks = db.books.filter((book) => book.category.includes(category));
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if (getSpecificBooks.length === 0) {
        return res.json({ "error": `No Books found for the category of ${category}` });
    }
    return res.json(getSpecificBooks);
});



// http://localhost:3000/authors
app.get("/authors", (req, res) => {
    const getAllAuthors = db.authors;
    return res.json(getAllAuthors);
});

// http://localhost:3000/author-id/1
app.get("/author-id/:id", (req, res) => {
    // console.log(req.params);
    let { id } = req.params;
    id = Number(id);
    // console.log(id);
    const getSpecificAuthor = db.authors.filter((author) => author.id === id);
    // console.log(getSpecificAuthor);
    // console.log(getSpecificAuthor.length);
    if (getSpecificAuthor.length === 0) {
        return res.json({ "error": `No Author found for the id of ${id}` });
    }
    return res.json(getSpecificAuthor[0]);
});

// http://localhost:3000/author-isbn/12345TWO
app.get("/author-isbn/:isbn", (req, res) => {
    // console.log(req.params);
    let { isbn } = req.params;
    isbn = String(isbn);
    // console.log(isbn);
    const getSpecificAuthor = db.authors.filter((author) => author.books.includes(isbn));
    // console.log(getSpecificAuthor);
    // console.log(getSpecificAuthor.length);
    if (getSpecificAuthor.length === 0) {
        return res.json({ "error": `No Author found for the isbn of ${isbn}` });
    }
    return res.json(getSpecificAuthor);
});

// http://localhost:3000/publications
app.get("/publications", (req, res) => {
    const getAllPublications = db.publications;
    return res.json(getAllPublications);
});

// http://localhost:3000/publication-isbn/12345TWO
app.get("/publication-isbn/:isbn", (req, res) => {
       // console.log(req.params);
       let { isbn } = req.params;
       isbn = String(isbn);
       // console.log(isbn);
       const getSpecificPublication = db.publications.filter((publication) => publication.books.includes(isbn));
       // console.log(getSpecificAuthor);
       // console.log(getSpecificAuthor.length);
       if (getSpecificPublication.length === 0) {
           return res.json({ "error": `No publications found for the isbn of ${isbn}` });
       }
       return res.json(getSpecificPublication[0]);
});

// http://localhost:3000/book
app.post("/book", (req, res) => {
    db.books.push(req.body);
    return res.json(db.books);
 });
 
 
 // http://localhost:3000/author
 app.post("/author", (req, res) => {
     db.authors.push(req.body);
     return res.json(db.authors);
 });
 
 
 // http://localhost:3000/publication
 app.post("/publication", (req, res) => {
     db.publications.push(req.body);
     return res.json(db.publications);
 });

 
// http://localhost:3000/book-update/12345TWO
app.put("/book-update/:isbn", (req, res) => {
//    console.log(req.body);
//    console.log(req.params);

   const { isbn } = req.params;

   db.books.forEach((book) => {
       if(book.ISBN === isbn) {
        //    console.log({...book, ...req.body});
           return {...book, ...req.body};
       }
       return book;
   })
   return res.json(db.books);
});


// http://localhost:3000/author-update/1
app.put("/author-update/:id", (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
 
    const { id } = req.params;
 
    db.authors.forEach((author) => {
        if(author.id === id) {
            // console.log({...author, ...req.body});
            return {...author, ...req.body};
        }
        return author;
    })
    return res.json(db.authors);
 });


 
// http://localhost:3000/publication-update/1
app.put("/publication-update/:id", (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
 
    const { id } = req.params;
 
    db.publications.forEach((publication) => {
        if(publication.id === id) {
            // console.log({...publication, ...req.body});
            return {...publication, ...req.body};
        }
        return publication;
    })
    return res.json(db.publications);
 });


 
// http://localhost:3000/book-delete/12345TWO
app.delete("/book-delete/:isbn", (req, res) => {
    // console.log(req.params);
    const { isbn } = req.params;
    const filteredBooks = db.books.filter((book) => book.ISBN !== isbn);
    // console.log(filteredBooks);
    db.books = filteredBooks;
    return res.json(db.books);


});


// http://localhost:3000/author-delete/1


// http://localhost:3000/publication-delete/1





// http://localhost:3000/book-author-delete/12345ONE/1
app.delete("/book-author-delete/:isbn/:id", (req, res) => {
    // console.log(req.params);
    let { isbn, id } = req.params;
    id = Number(id);
    db.books.forEach((book) => {
        if(book.ISBN === isbn) {
            // console.log({...publication, ...req.body});
            if(!book.authors.includes(id)){
                return;
            }
            book.authors = book.authors.filter((author) => author !== id);
        }
        return book;
    })
    return res.json(db.books);

});


// http://localhost:3000/author-book-delete/1/12345ONE
app.delete("/author-book-delete/:id/:isbn", (req, res) => {
    // console.log(req.params);
    let { isbn, id } = req.params;
    id = Number(id);
    db.authors.forEach((author) => {
        if(author.id === id) {
            // console.log({...publication, ...req.body});
            if(!author.books.includes(isbn)){
                return;
            }
            author.books = author.books.filter((author) => author !== isbn);
        }
        return author;
    })
    return res.json(db.authors);

});



app.listen(3000, () => {
    console.log("My Express APP is running at localhost:3000");
})