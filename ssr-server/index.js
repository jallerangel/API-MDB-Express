import express from 'express';
import config from './config/index.js';
import passport from 'passport';
import * as boom from '@hapi/boom';
import axios from 'axios';
import cookieParser from 'cookie-parser';

const { port } = config;

const app = express();

app.use(express.json());
app.use(cookieParser());

import './utils/auth/strategies/basic.js';
app.post('/auth/sign-in', async (req, res, next) => {
	passport.authenticate('basic', (err, data) => {
		try {
			if (err || !data) return next(boom.unauthorized());

			req.login(data, { session: false }, async (err) => {
				if (err) return next(err);
				const { token } = data;
				console.log(data);
				res.cookie('token', token, {
					httpOnly: !config.dev,
					secure: !config.dev,
				});
				res.status(200).json(data);
			});
		} catch (e) {
			next(e);
		}
	})(req, res, next);
});

app.post('/auth/sign-up', async (req, res, next) => {
	const { body: user } = req;
	try {
		await axios({
			url: `${config.apiUrl}/api/auth/sign-up`,
			method: 'post',
			data: user,
		});
		res.status(201).json({ message: 'User created' });
	} catch (e) {
		next(e);
	}
});

app.get('/movies', async (req, res, next) => {});
app.post('/user-movies', async (req, res, next) => {
	try {
		const { body: userMovie } = req;
		const { token } = req.cookies;

		const { data, status } = await axios({
			url: `${config.apiUrl}/api/user-movies`,
			headers: { Authorization: `Bearer ${token}` },
			method: 'post',
			data: userMovie,
		});

		if (status !== 201) return next(boom.badImplementation());

		res.status(201).json(data);
	} catch (e) {
		next(e);
	}
});
app.delete('/user-movies/:userMovieId', async (req, res, next) => {
	try {
		const { userMovieId } = req.params;
		const { token } = req.cookies;

		const { data, status } = await axios({
			url: `${config.apiUrl}/api/user-movies/${userMovieId}`,
			headers: { Authorization: `Bearer ${token}` },
			method: 'delete',
			data: userMovieId,
		});

		if (status !== 200) return next(boom.badImplementation());

		res.status(200).json(data);
	} catch (e) {
		next(e);
	}
});

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`);
});
