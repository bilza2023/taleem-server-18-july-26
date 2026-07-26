// middleware/requireUser.js

export default function requireUser() {

	return (req, res, next) => {

		if (!req.user) {

			return res.status(401).json({
				message: "User authentication required."
			});

		}

		next();

	};

}