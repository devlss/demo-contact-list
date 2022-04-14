import {RequestHandler} from 'express';

import db from './db.json';

const AUTH_DATA_ENCODED = db.users.map((user) => Buffer.from(`${user.login}:${user.password}`).toString('base64'));

export const checkAuthMiddleware: RequestHandler = (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (authHeader && AUTH_DATA_ENCODED.includes(authHeader.split(' ')[1])) {
		next();
	} else {
		res.sendStatus(401);
	}
};

// export const setAuthMiddleware: RequestHandler = (req, res, next) => {
// 	if (req.body) {
// 		try {
// 			const authReqData = JSON.parse(req.body) as AuthData;
// 			if (authReqData.user)
// 		} catch (error) {
// 			res.sendStatus(500);
// 		}
// 	}
// 	const authorized = Boolean(req.get('Authorization')?.endsWith(AUTH_DATA_ENCODED));
// 	if (authorized) {
// 		next();
// 	} else {
// 		res.sendStatus(401);
// 	}
// };
