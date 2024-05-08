const { bookshelfData } = require('../data');
const { bookshelfResponse } = require('./response')

const getBookByIdHandler = (req, h) => {
    const { id } = req.params;
    const book = [...bookshelfData].find(book => book.id === id)

    if (!book) {
        return bookshelfResponse(
            h,
            null,
            false,
            "Buku tidak ditemukan",
            404
        )
    }

    return bookshelfResponse(
        h,
        { book },
        true,
        null,
        200
    )
}

const getBookById = {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler
}

module.exports = getBookById;