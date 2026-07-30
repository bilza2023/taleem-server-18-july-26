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

		if (filters.libraryId) {
			where.libraryId = filters.libraryId;
		}

		return this.kernel.db.communication.findMany({
			where
		});

	}

	async get(id) {

		return this.kernel.db.communication.findUnique({

			where: { id },

			include: {

				library: {

					select: {

						id: true,
						title: true,

						course: {
							select: {
								id: true,
								title: true
							}
						}

					}

				}

			}

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

	async listUnanswered(admin) {

		const courseIds = (
			await this.kernel.db.adminCoursePolicy.findMany({

				where: { adminId: admin.id, communication: true },

				select: { courseId: true }

			})
		).map(x => x.courseId);

		return this.kernel.db.communication.findMany({

			where: {

				OR: [
					{ authorResponse: null },
					{ authorResponse: "" }
				],

				library: {
					courseId: {
						in: courseIds
					}
				}

			},

			include: {

				user: {
					select: { id: true, name: true }
				},

				library: {

					select: {

						id: true,
						title: true,

						course: {
							select: {
								id: true,
								title: true
							}
						}

					}

				}

			}

		});

	}

}