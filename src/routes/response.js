const bookshelfResponse = (h, data, success, message, code) => {
    let responseData = {
        status: success ? "success" : "fail",
        data: data,
    };

    if (success && message) {
        responseData.message = message;
    }

    const response = h.response(responseData).code(code);
    return response;
};

module.exports = bookshelfResponse;
