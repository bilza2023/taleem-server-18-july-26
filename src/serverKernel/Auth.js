export default class Auth {

	constructor(kernel) {this.kernel = kernel;}
	// --------------------------------------------------
	// Token Creation
	// --------------------------------------------------
	createUserToken(user) {

		return this.kernel.jwt.sign({ id: user.id, type: "user" });

	}

	createAdminToken(admin) {

		return this.kernel.jwt.sign({ id: admin.id, type: "admin" });

	}

	// --------------------------------------------------
	// Authentication
	// --------------------------------------------------

	async authenticate(token) {

		const { id, type } = this.verifyToken(token);

		if (type === "user") return this.authenticateUser(id);

		if (type === "admin") return this.authenticateAdmin(id);

		this.fail("authenticate()", `Unknown identity type '${type}'.`);

	}

	async authenticateUser(id) {

		const user = await this.kernel.user.getById(id);

		if (!user)
			this.fail("authenticateUser()", `User '${id}' does not exist.`);

		return user;

	}

	async authenticateAdmin(id) {

		const admin = await this.kernel.admin.getById(id);

		if (!admin)
			this.fail("authenticateAdmin()", `Admin '${id}' does not exist.`);

		return admin;

	}

	verifyToken(token) {

		try {

			return this.kernel.jwt.verify(token);

		}
		catch (error) {

			this.fail("verifyToken()", error.message);

		}

	}

	// --------------------------------------------------
	// Helpers
	// --------------------------------------------------

	fail(method, reason) {

		throw new Error(
			[
				"",
				"========================================",
				"AUTHENTICATION FAILED",
				"----------------------------------------",
				`Method : Auth.${method}`,
				`Reason : ${reason}`,
				"========================================"
			].join("\n")
		);

	}

}