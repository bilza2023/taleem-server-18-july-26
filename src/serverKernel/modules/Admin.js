// src/serverKernel/modules/Admin.js

import bcrypt from "bcrypt";

export default class Admin {

	constructor(kernel) {

		this.kernel = kernel;

	}

	async getById(id) {

		return this.kernel.db.admin.findUnique({
			where: { id }
		});

	}

	async getByEmail(email) {

		return this.kernel.db.admin.findUnique({
			where: { email }
		});

	}

	async login(email, password) {

		const admin = await this.getByEmail(email);

		if (!admin)
			throw new Error(`Admin.login(): Admin '${email}' not found.`);

		if (!admin.isActive)
			throw new Error(`Admin.login(): Admin '${email}' is inactive.`);

		const ok = await bcrypt.compare(password, admin.password);

		if (!ok)
			throw new Error(`Admin.login(): Invalid password.`);

		return this.kernel.auth.createAdminToken(admin);

	}

}