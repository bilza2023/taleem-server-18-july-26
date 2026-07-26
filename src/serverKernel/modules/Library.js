// src/serverKernel/modules/Library.js

export default class Library {

	constructor(kernel) {

		this.kernel = kernel;

	}

	async list() {

		return this.kernel.db.library.findMany({

			orderBy: {
				createdAt: "desc"
			}

		});

	}

	async get(id) {

		return this.kernel.db.library.findUnique({

			where: {
				id
			}

		});

	}

	async getBySlug(slug) {

		return this.kernel.db.library.findUnique({

			where: {
				slug
			}

		});

	}

	async create(data) {

		return this.kernel.db.library.create({

			data

		});

	}

	async update(id, data) {

		return this.kernel.db.library.update({

			where: {
				id
			},

			data

		});

	}

	async delete(id) {

		return this.kernel.db.library.delete({

			where: {
				id
			}

		});

	}

}