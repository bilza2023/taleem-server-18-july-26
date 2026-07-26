// src/serverKernel/Auth.js

export default class Auth {

	constructor(kernel) {

		this.kernel = kernel;

	}

	createUserToken(user) {

		return this.kernel.jwt.sign({

			id: user.id,
			type: "user"

		});

	}

	createAdminToken(admin) {

		return this.kernel.jwt.sign({

			id: admin.id,
			type: "admin"

		});

	}

	verifyToken(token) {

		return this.kernel.jwt.verify(token);

	}

}