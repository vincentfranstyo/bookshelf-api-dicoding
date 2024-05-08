const {bookshelfData} = require('../data');
const {bookshelfResponse} = require('./response')

const updateBookByIdHandler = (req, h) => {
    const {id} = req.params;

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

    const book = [...bookshelfData].find((book) => book.id === id);

    if (!name || name.trim() === "") {
        return bookshelfResponse(h, undefined, false, "Gagal memperbarui buku. Mohon isi nama buku", 400);
    }

    if (readPage > pageCount) {
			return bookshelfResponse(
				h,
				undefined,
				false,
				"Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
				400
			);
		}

		if (!book) {
			return bookshelfResponse(
				h,
				undefined,
				false,
				"Gagal memperbarui buku. Id tidak ditemukan",
				404
			);
		}

		const updatedBook = {
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
			insertedAt: book.insertedAt,
			updatedAt: new Date().toISOString(),
		};

		bookshelfData[bookshelfData.indexOf(book)] = updatedBook;

		return bookshelfResponse(
			h,
			undefined,
			true,
			"Buku berhasil diperbarui",
			200
		);
}

exports.updateBookById = {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBookByIdHandler
}