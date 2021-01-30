import express from 'express';

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// todo: move to a secure place
const jwtSecret = 'My!@!Se3cr8tH4sh3';
const tokenExpirationInSeconds = 36000;

class AuthController {
	private static instance: AuthController;

	static getInstance() {
		if (!AuthController.instance) {
			AuthController.instance = new AuthController();
		}
		return AuthController.instance;
	}

	async createJWT(req: express.Request, res: express.Response) {
		try {
			const refreshId = req.body.userId + jwtSecret;
			const salt = crypto.randomBytes(16).toString('base64');
			const hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');
			req.body.refreshKey = salt;
			const token = jwt.sign(req.body, jwtSecret, { expiresIn: tokenExpirationInSeconds });
			const b = Buffer.from(hash);
			const refreshToken = b.toString('base64');
			return res.status(201).send({ accessToken: token, refreshToken: refreshToken });
		} catch (err) {
			return res.status(500).send(err);
		}
	}
}

export default AuthController.getInstance();
