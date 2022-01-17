
const db = require('./database/index.js');
require('dotenv').config()
const BookModel = require('./database/books');
const AuthorModel = require('./database/authors');
const PublicationModel = require('./database/publications');


// const mongoose = require('mongoose');
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB =  process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));


// const uri = "mongodb+srv://kumaran_bk:BUTPPDK2047135171998@cluster0.dqgva.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const bcollection = client.db("book-company").collection("books").findOne({ISBN : "12345ONE"});
//     bcollection.then((data) => console.log(data)).catch((err) => console.log(err));

// });
// client.close();


// async function listDatabases(client){
//     databaseList = await client.db().admin().listDatabases();
//     console.log("THE DATABASES ARE");
//     databaseList.databases.forEach(db=> console.log(db.name));
// }


// async function main() {
//     const uri = "mongodb+srv://kumaran_bk:BUTPPDK2047135171998@cluster0.dqgva.mongodb.net/book-company?retryWrites=true&w=majority";
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     try {
//         await client.connect();
//         const results = await client.db("book-company").collection("books").findOne();
//         console.log(results);
//         // await listDatabases(client);
//     }
//     catch(err) {
//         console.log(err);
//     }
//     finally {
//         await client.close();
//     }
// }
// main();



// http://localhost:3000/
app.get("/", (req, res) => {
    return res.json({"WELCOME": `to my Backend Software for the Book Company`});
});

// http://localhost:3000/
app.get('/books', async (req, res) => {

    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
    // res.json(getAllBooks);
    // res.send(getAllBooks);
});



// http://localhost:3000/book-isbn/12345TWO
app.get("/book-isbn/:isbn", async (req, res) => {
    // console.log(req.params);
    // const isbn = req.params.isbn; // We can also use as like this
    const { isbn } = req.params;

    // console.log(isbn);
    const getSpecificBook = await BookModel.findOne( {ISBN: isbn} );
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if (getSpecificBook=== null) {
        return res.json({ "error": `No Book found for the ISBN of ${isbn}` });
    }
    return res.json(getSpecificBook);
});


// http://localhost:3000/book-category/programming
app.get("/book-category/:category", async (req, res) => {
    // console.log(req.params);
    const { category } = req.params;
    // console.log(category);
    const getSpecificBooks = await BookModel.find( {category: category} );
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if (getSpecificBooks.length === 0) {
        return res.json({ "error": `No Books found for the category of ${category}` });
    }
    return res.json(getSpecificBooks);
});



// http://localhost:3000/authors
app.get("/authors", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});

// http://localhost:3000/author-id/1
app.get("/author-id/:id", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const { id } = req.params;
    const getSpecificAuthor = await AuthorModel.findOne( {id: id} );
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if (getSpecificAuthor === null) {
        return res.json({ "error": `No Author found for the Id of ${id}` });
    }
    return res.json(getSpecificAuthor);
});

// http://localhost:3000/author-isbn/12345TWO
app.get("/author-isbn/:isbn", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const { isbn } = req.params;
    const getSpecificAuthor = await AuthorModel.findOne( {ISBN: isbn} );
    if (getSpecificAuthor === null) {
        return res.json({ "error": `No Author found for the ISBN of ${isbn}` });
    }
    return res.json(getSpecificAuthor);
});

// http://localhost:3000/publications
app.get("/publications", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
});

// http://localhost:3000/publication-isbn/12345TWO
app.get("/publication-isbn/:isbn", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const { isbn } = req.params;
    // console.log(isbn);
    const getSpecificPublication = await PublicationModel.findOne( {ISBN: isbn} );
    if (getSpecificPublication === null) {
        return res.json({ "error": `No Publication found for the ISBN of ${isbn}` });
    }
    return res.json(getSpecificPublication);
});


// http://localhost:3000/book
app.post("/book", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
   const addNewBook = await BookModel.create(req.body);
   return res.json({ bookAdded: addNewBook, message: "Book added successfully!" });
});


// http://localhost:3000/author
app.post("/author", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const addNewAuthor = await AuthorModel.create(req.body);
    return res.json({ AuthorAdded: addNewAuthor, message: "Author added successfully!" });
 });

// http://localhost:3000/publication
app.post("/publication", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const addNewPublication = await PublicationModel.create(req.body);
    return res.json({ PublicationAdded: addNewPublication, message: "Publication added successfully!" });
 });


// http://localhost:3000/book-update/12345TWO
app.put("/book-update/:isbn", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const { isbn } = req.params;
    const updateBook = await BookModel.findOneAndUpdate( { ISBN : isbn }, req.body, { new : true } );
    return res.json({ bookupdated: updateBook, message: "Successfully Book Updated!" });
});


// http://localhost:3000/author-update/1
app.put("/author-update/:id", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const { id } = req.params;
    const updateAuthor = await AuthorModel.findOneAndUpdate( { id : id }, req.body, { new : true } );
    return res.json({ Authorupdated: updateAuthor, message: "Successfully Author Updated!" });
 });


 
// http://localhost:3000/publication-update/1
app.put("/publication-update/:id",  async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const { id } = req.params;
    const updatePublication = await PublicationModel.findOneAndUpdate( { id : id }, req.body, { new : true } );
    return res.json({ Publicationupdated: updatePublication, message: "Successfully Publication Updated!" });
 });


 
// http://localhost:3000/book-delete/12345TWO
app.delete("/book-delete/:isbn", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const { isbn } = req.params;
    const deleteBook = await BookModel.deleteOne( { ISBN : isbn });
    return res.json({ bookdeleted: deleteBook, message: "Successfully Book deleted!" });


});


// http://localhost:3000/author-delete/1
app.delete("/author-delete/:id", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const { id } = req.params;
    const deleteAuthor = await AuthorModel.deleteOne( { id : id });
    return res.json({ Authordeleted: deleteAuthor, message: "Successfully Author deleted!" });


});

// http://localhost:3000/publication-delete/1
app.delete("/publication-delete/:id", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const { id } = req.params;
    const deletePublication = await PublicationModel.deleteOne( { id : id });
    return res.json({ Publicationdeleted: deletePublication, message: "Successfully Publication deleted!" });


});




// http://localhost:3000/book-author-delete/12345Three/1
app.delete("/book-author-delete/:isbn/:id", async (req, res) => {
    // console.log(req.params);
    const {isbn, id} = req.params;
    let getSpecificBook = await BookModel.findOne({ISBN: isbn});
    if(getSpecificBook===null) {
        return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
    else {
        getSpecificBook.authors.remove(id);
        const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn}, getSpecificBook, {new: true});
        return res.json( {bookUpdated: updateBook, message: "Author was Deleted from the Book !!!"} );
    }
});


// http://localhost:3000/author-book-delete/1/12345ONE
app.delete("/author-book-delete/:id/:isbn", async (req, res) => {
    // console.log(req.params);
    const {isbn, id} = req.params;
    let getSpecificAuthor = await AuthorModel.findOne({id: id});
    if(getSpecificAuthor===null) {
        return res.json({"error": `No Author found for the id of ${id}`});
    }
    else {
        getSpecificAuthor.books.remove(isbn);
        const updateAuthor = await AuthorModel.findOneAndUpdate({id: id}, getSpecificAuthor, {new: true});
        return res.json( {bookUpdated: updateAuthor, message: "Book was Deleted from the Book !!!"} );
    }  

});



app.listen(3000, () => {
    console.log("My Express APP is running at localhost:3000");
})