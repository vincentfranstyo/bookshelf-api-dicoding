const Hapi = require('@hapi/hapi')
const {addBooks} = require('./routes/addBooks');
const {getBooks} = require('./routes/getBooks');
const {getBookById} = require('./routes/getBookById');
const {updateBookById} = require('./routes/updateBookById');
const {deleteBookById} = require('./routes/deleteBookById');

const PORT = 9000;
const HOST = '0.0.0.0';
const routes = [addBooks, getBooks, getBookById, updateBookById, deleteBookById];

const init = async () => {
    const server = Hapi.server({
        port: PORT,
        host: HOST,
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    });

    await server.start();
    console.log(`Server is listening on port ${server.info.uri}`)

    server.route(routes);
};

init();

