// src/serverKernel/modules/User.js

import bcrypt from "bcrypt";

export default class User {

	constructor(kernel) {

		this.kernel = kernel;

	}

	async list() {

		return this.kernel.db.user.findMany({

			orderBy: {
				createdAt: "desc"
			}

		});

	}

	async get(id) {

		return this.kernel.db.user.findUnique({

			where: {
				id
			}

		});

	}

	async findByEmail(email) {

		return this.kernel.db.user.findUnique({

			where: {
				email
			}

		});

	}

	async register(data) {

		const password = await bcrypt.hash(
			data.password,
			10
		);

		return this.kernel.db.user.create({

			data: {

				...data,

				password

			}

		});

	}

	async login(email, password) {

		const user = await this.findByEmail(email);

		if (!user) {

			return null;

		}

		const ok = await bcrypt.compare(
			password,
			user.password
		);

		if (!ok) {

			return null;

		}

		return this.kernel.auth.createUserToken(user);

	}

	async update(id, data) {

		if (data.password) {

			data.password = await bcrypt.hash(
				data.password,
				10
			);

		}

		return this.kernel.db.user.update({

			where: {
				id
			},

			data

		});

	}

	async delete(id) {

		return this.kernel.db.user.delete({

			where: {
				id
			}

		});

	}

}