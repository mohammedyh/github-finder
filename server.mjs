import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve(path.dirname(''));

app.use(express.static('public'));
app.use(express.json());

app.get('/', (_req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/user/:userName', async (req, res) => {
	const user = await fetch(
		`https://api.github.com/users/${req.params.userName}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.API_KEY}`
	);
	const data = await user.json();
	res.status(200).json(data);
});

app.listen(PORT, () => console.log(`server running on localhost:${PORT}`));
