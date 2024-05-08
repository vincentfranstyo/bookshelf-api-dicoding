const { bookshelfData } = require("../data");
const { bookshelfResponse } = require("./response");

const deleteBookByIdHandler = (req, h) => {
    const { id } = req.params;

    const book = [...bookshelfData].find(book => book.id === id);

    if (!book) {
			return bookshelfResponse(
				h,
				undefined,
				false,
				"Buku gagal dihapus. Id tidak ditemukan",
				404
			);
		}

		bookshelfData.splice(bookshelfData.indexOf(book), 1);

		return bookshelfResponse(
			h,
			undefined,
			true,
			"Buku berhasil dihapus",
			200
		);
}

exports.deleteBookById = {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler
}