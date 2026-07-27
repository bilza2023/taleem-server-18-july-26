// src/serverKernel/modules/Library.js

export default class Library {

	constructor(kernel) {

		this.kernel = kernel;

	}

	// --------------------------------------------------
	// Queries
	// --------------------------------------------------

	async list() {

		return this.kernel.db.library.findMany({
			orderBy: { createdAt: "desc" }
		});

	}

	async getById(id) {

		return this.kernel.db.library.findUnique({
			where: { id }
		});

	}

	async getBySlug(slug) {

		return this.kernel.db.library.findUnique({
			where: { slug }
		});

	}

	// --------------------------------------------------
	// CRUD
	// --------------------------------------------------

	async create(admin, data) {

		// TODO: authorize admin for "library"

		return this.kernel.db.library.create({
			data
		});

	}

	async update(admin, id, data) {

		// TODO: authorize admin for "library"

		return this.kernel.db.library.update({
			where: { id },
			data
		});

	}

	async delete(admin, id) {

		// TODO: authorize admin for "library"

		return this.kernel.db.library.delete({
			where: { id }
		});

	}

}