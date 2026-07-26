// src/serverKernel/modules/Admin.js

import bcrypt from "bcrypt";

export default class Admin {

	constructor(kernel) {

		this.kernel = kernel;

	}

	async findById(id) {

		return this.kernel.db.admin.findUnique({

			where: {
				id
			}

		});

	}

	async findByEmail(email) {

		return this.kernel.db.admin.findUnique({

			where: {
				email
			}

		});

	}

	async login(email, password) {

		const admin = await this.findByEmail(email);

		if (!admin) {

			return null;

		}

		if (!admin.isActive) {

			return null;

		}

		const ok = await bcrypt.compare(
			password,
			admin.password
		);

		if (!ok) {

			return null;

		}

		return this.kernel.auth.createAdminToken(admin);

	}

}