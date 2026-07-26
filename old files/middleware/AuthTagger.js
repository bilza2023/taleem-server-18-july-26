// middleware/AuthTagger.js

import GetUserSubs from "../repositories/GetUserSubs.js";

export default async function AuthTagger(req, res, next
) {
	req.auth =
		await GetUserSubs.build(req.user);
	next();
}