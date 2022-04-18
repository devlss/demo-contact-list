import dotenv from 'dotenv';
import path from 'path';
import jsonServer from 'json-server';
import {checkAuthMiddleware} from './auth.js';

dotenv.config({
	path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`)
});

const PORT = process.env.REACT_APP_SERVER_PORT || 3001;

const defaults = jsonServer.defaults({
	static: path.resolve(process.cwd(), 'build')
});
const db = jsonServer.router(path.join('server', 'build', 'db.json'));

const server = jsonServer.create();
server.use(defaults);
server.use('/api', checkAuthMiddleware, db);
server.use((_req, res) => {
	res.redirect('/');
});

server.listen(PORT, () => {
	console.log(`JSON Server is running on ${PORT}`);
});
