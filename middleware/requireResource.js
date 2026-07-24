// middleware/requireResource.js

export default function requireResource(resource) {

	return (req, res, next) => {

		// --------------------------------------------------
		// Super Admin
		// --------------------------------------------------
		
		if (req.user.role === "SUPER_ADMIN") {
			return next();
		}

		// --------------------------------------------------
		// Must be an Admin
		// --------------------------------------------------

		if (req.user.role !== "ADMIN") {
			return res.status(403).json({
				message: "Administrator access required."
			});
		}

		// --------------------------------------------------
		// Must own this resource
		// --------------------------------------------------

		if (req.user.resource !== resource) {
			return res.status(403).json({
				message: `Access denied for resource '${resource}'.`
			});
		}

		// --------------------------------------------------
		// Allowed
		// --------------------------------------------------
		next();

	};

}