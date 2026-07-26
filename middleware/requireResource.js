// middleware/requireResource.js

export default function requireResource(resource) {

	return (req, res, next) => {

		if (!req.admin) {

			return res.status(401).json({
				message: "Administrator authentication required."
			});

		}

		if (req.admin.resource !== resource) {

			return res.status(403).json({
				message: `Access denied for resource '${resource}'.`
			});

		}

		next();

	};

}