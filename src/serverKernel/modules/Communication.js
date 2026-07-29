// src/serverKernel/modules/Communication.js

export default class Communication {

	constructor(kernel) {
		this.kernel = kernel;
	}

	// --------------------------------------------------
	// Queries
	// --------------------------------------------------

	async list(filters = {}) {

		const where = {};

		if (filters.userId) {
			where.userId = filters.userId;
		}

		if (filters.referenceId) {
			where.referenceId = filters.referenceId;
		}

		return this.kernel.db.communication.findMany({
			where
		});

	}

	async get(id) {

		return this.kernel.db.communication.findUnique({
			where: { id }
		});

	}

	// --------------------------------------------------
	// CRUD
	// --------------------------------------------------

	async create(data) {

		return this.kernel.db.communication.create({
			data
		});

	}

	async update(id, data) {

		return this.kernel.db.communication.update({
			where: { id },
			data
		});

	}

	async delete(id) {

		return this.kernel.db.communication.delete({
			where: { id }
		});

	}

	// --------------------------------------------------
	// Special Queries
	// --------------------------------------------------

	async listUnanswered() {

		return this.kernel.db.communication.findMany({

			where: {
				OR: [
					{ authorResponse: null },
					{ authorResponse: "" }
				]
			},

			include: {
				user: {
					select: {
						id: true,
						name: true
					}
				}
			}

		});

	}

}