const { bookshelfData } = require('../data');
const { bookshelfResponse } = require('./response')

const getBooksHandler = (req, h) => {
    const { name, reading, finished } = req.query;
    let books = [...bookshelfData]

    if (name) {
        books = books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()));
    }
    
    if (reading) {
        books = books.filter(book => book.reading === reading);
    }

    if (finished) {
        books = books.filter(book => book.finished === finished);
    }

    const displayed = books.map(book => {
        return {
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }
    })
    return bookshelfResponse(h, {books: displayed}, true, null, 200);
}

const getBooks = {
    method: 'GET',
    path: '/books',
    handler: getBooksHandler
}

module.exports = getBooks