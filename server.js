import dotenv from 'dotenv';
import express from 'express';
import path from 'node:path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (_req, res) => {
	res.sendFile(path.join(import.meta.dirname, 'public', 'index.html'));
});

app.get('/user/:userName', async (req, res) => {
	try {
		const userData = await fetch(
			`https://api.github.com/users/${req.params.userName}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.API_KEY}`
		);

		if (userData.headers.get('x-ratelimit-remaining') == 0) {
			return res.status(200).json({
				error: true,
				message: 'API rate limit exceeded. No further requests allowed.',
			});
		}

		if (!userData.ok) {
			return res.status(200).json({
				error: true,
				message: 'There was an error processing your request.',
			});
		}

		const data = await userData.json();
		res.status(200).json(data);
	} catch (error) {
		console.log(error);
		res.status(200).json({
			message: error.message,
		});
	}
});

app.listen(PORT, () =>
	console.log(`server running on http://localhost:${PORT}`)
);
