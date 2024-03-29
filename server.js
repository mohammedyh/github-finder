import express from 'express';
import path from 'node:path';
import dotenv from 'dotenv';

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
		const data = await userData.json();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

app.listen(PORT, () =>
	console.log(`server running on http://localhost:${PORT}`)
);
