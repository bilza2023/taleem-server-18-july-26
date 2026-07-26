// src/serverKernel/modules/Course.js

export default class Course {

	constructor(kernel) {

		this.kernel = kernel;

	}

	async list() {

		return this.kernel.db.course.findMany({

			orderBy: {
				title: "asc"
			}

		});

	}

	async get(id) {

		return this.kernel.db.course.findUnique({

			where: {
				id
			}

		});

	}

	async getBySlug(slug) {

		return this.kernel.db.course.findUnique({

			where: {
				slug
			}

		});

	}

	async create(data) {

		return this.kernel.db.course.create({

			data

		});

	}

	async update(id, data) {

		return this.kernel.db.course.update({

			where: {
				id
			},

			data

		});

	}

	async delete(id) {

		return this.kernel.db.course.delete({

			where: {
				id
			}

		});

	}

}