const {bookshelfData} = require('../data');
const {bookshelfResponse} = require('./response');
const {nanoid} = require("nanoid");

const addBooksHandler = (req, h) => {
    const id = nanoid(16);
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = req.payload;
    const updatedAt = new Data().toISOString();
    const insertedAt = updatedAt;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished: readPage === pageCount,
        insertedAt,
        updatedAt,
    };

    if (name === "" || !name) {
        return bookshelfResponse(h,
            null,
            false,
            "Gagal menambahkan buku. Mohon isi nama buku",
            400);
    }

    if (readPage > pageCount) {
        return bookshelfResponse(
            h,
            null,
            false,
            "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
            400
        );
    }

    bookshelfData.push(newBook);

    return bookshelfResponse(
        h,
        {bookId: id},
        true,
        "Buku berhasil ditambahkan",
        201
    );
}

exports.addBooks = {
    method: "POST",
    path: '/books',
    handler: addBooksHandler,
}