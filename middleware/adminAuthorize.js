// middleware/adminAuthorize.js

export default function adminAuthorize(resource) {

	return (req, res, next) => {

		// --------------------------------------------------
		// Must be authenticated
		// --------------------------------------------------

		if (!req.user) {

			return res.status(401).json({

				message: "Authentication required."

			});

		}

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
		// Authorized
		// --------------------------------------------------

		next();

	};

}