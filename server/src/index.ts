import dotenv from 'dotenv';
import path from 'path';
import jsonServer from 'json-server';
import {checkAuthMiddleware} from './auth.js';

dotenv.config({
	path: path.resolve(process.cwd(), '.env.local.development')
});

const PORT = process.env.REACT_APP_SERVER_PORT || 3001;
const server = jsonServer.create();
const db = jsonServer.router(path.join('server', 'build', 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares, checkAuthMiddleware, db);

server.listen(PORT, () => {
	console.log(`JSON Server is running on ${PORT}`);
});
