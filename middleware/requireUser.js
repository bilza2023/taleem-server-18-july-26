// middleware/publicAuthorize.js

export default function publicAuthorize() {

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
		// Public authorization
		// --------------------------------------------------
		//
		// This middleware intentionally does not perform
		// any authorization itself.
		//
		// Public routes (library, courses, subscriptions,
		// etc.) should perform their own domain-specific
		// authorization inside their services/controllers.
		//
		// This middleware simply marks the transition from
		// authentication to public authorization.
		// --------------------------------------------------

		next();

	};

}