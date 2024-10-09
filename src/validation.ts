import { validator } from "hono/validator";

export const validateUsernameParam = validator('param', (value, c) => {
	const userName = value['userName'];
	if (!userName.trim() || typeof userName !== 'string') {
		return c.json({ error: true, message: 'Invalid username' }, 400);
	}
	return { userName };
});
