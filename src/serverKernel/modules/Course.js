// src/serverKernel/modules/Course.js

export default class Course {

	constructor(kernel) {

		this.kernel = kernel;

	}

	// --------------------------------------------------
	// Queries
	// --------------------------------------------------

	async list() {

		return this.kernel.db.course.findMany({
			orderBy: {
				title: "asc"
			}
		});

	}

	async getById(id) {

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

	// --------------------------------------------------
	// Internal CRUD (ID Based)
	// --------------------------------------------------

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

	// --------------------------------------------------
	// Public CRUD (Slug Based)
	// --------------------------------------------------

	async createBySlug(data) {

		return this.create(data);

	}

	async updateBySlug(slug, data) {

		const course = await this.getBySlug(slug);

		if (!course) {
			throw new Error(`Course "${slug}" not found.`);
		}

		return this.update(course.id, data);

	}

	async deleteBySlug(slug) {

		const course = await this.getBySlug(slug);

		if (!course) {
			throw new Error(`Course "${slug}" not found.`);
		}

		return this.delete(course.id);

	}

}