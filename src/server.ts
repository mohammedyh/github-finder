import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import path from 'node:path';
import { loadEnvFile } from 'node:process';
import { validateUsernameParam } from './validation';

loadEnvFile(path.resolve(process.cwd(), '.env'));

const app = new Hono();

app.use(logger());
app.use('*', serveStatic({ root: './public' }));

app.get('/users/:userName', validateUsernameParam, async c => {
	const { userName } = c.req.valid('param');

	try {
		const userData = await fetch(
			`https://api.github.com/users/${userName}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.API_KEY}`
		);

		if (!userData.ok) {
			if (userData.status == 404) {
				return c.json(
					{ error: true, message: `The user ${userName} doesn't exist.` },
					404
				);
			}

			return c.json(
				{
					error: true,
					message: 'There was an error processing your request.',
				},
				500
			);
		}

		if (userData.headers.get('x-ratelimit-remaining') == '0') {
			return c.json(
				{
					error: true,
					message: 'API rate limit exceeded. No further requests allowed.',
				},
				429
			);
		}

		const data = await userData.json();
		return c.json(data);
	} catch (error: unknown) {
		return c.json({ error: true, message: 'Something went wrong' }, 500);
	}
});

serve({
	fetch: app.fetch,
	// @ts-ignore
	port: process.env.PORT || 3000,
});
