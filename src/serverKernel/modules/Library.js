// src/serverKernel/modules/Library.js

export default class Library {

	constructor(kernel) {

		this.kernel = kernel;

	}

	// --------------------------------------------------
	// Queries
	// --------------------------------------------------

async list() {

	const items = await this.kernel.db.library.findMany({

		include: {
			course: true
		},

		orderBy: {
			createdAt: "desc"
		}

	});

	return items.map(item => ({

		slug: item.slug,
		title: item.title,
		type: item.type,
		body: item.body,
		thumbnail : item.thumbnail,
		courseSlug: item.course.slug

	}));

}

async getById(id) {

	return this.kernel.db.library.findUnique({

		where: {
			id
		},

		include: {
			course: true
		}

	});

}

async getBySlug(slug) {

	const item = await this.kernel.db.library.findUnique({

		where: {
			slug
		},

		include: {
			course: true
		}

	});

	if (!item) {

		return null;

	}

	return {

		id: item.id,
		slug: item.slug,
		title: item.title,
		type: item.type,
		body: item.body,
		thumbnail:item.thumbnail,
		courseSlug: item.course.slug

	};

}




	// --------------------------------------------------
	// Internal CRUD (ID Based)
	// --------------------------------------------------

	async create(admin, data) {

// console.log("data" , data);

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

	// --------------------------------------------------
	// Public CRUD (Slug Based)
	// --------------------------------------------------

async createBySlug(admin, data) {

	// TODO: authorize admin for "library"

	const course = await this.kernel.course.getBySlug(data.courseSlug);

	if (!course) {
		throw new Error(`Course "${data.courseSlug}" not found.`);
	}

	return this.create(admin, {
		slug: data.slug,
		title: data.title,
		thumbnail: data.thumbnail,
		type: data.type,
		body: data.body,
		courseId: course.id
	});

}

async updateBySlug(admin, slug, data) {

		// TODO: authorize admin for "library"

		const library = await this.getBySlug(slug);

		if (!library) {
			throw new Error(`Library "${slug}" not found.`);
		}

		const course = await this.kernel.course.getBySlug(data.courseSlug);

		if (!course) {
			throw new Error(`Course "${data.courseSlug}" not found.`);
		}

		return this.update(admin, library.id, {
			slug: data.slug,
			title: data.title,
			type: data.type,
			body: data.body,
			thumbnail: data.thumbnail,
			courseId: course.id
		});

	}

	async deleteBySlug(admin, slug) {

		// TODO: authorize admin for "library"

		const library = await this.getBySlug(slug);

		if (!library) {
			throw new Error(`Library "${slug}" not found.`);
		}

		return this.delete(admin, library.id);

	}

	async listByCourse(courseSlug) {

	 const items = await this.kernel.db.library.findMany({

		where: {
			course: {
				slug: courseSlug
			}
		},

		include: {
			course: true
		},

		orderBy: {
			createdAt: "desc"
		}

	});

	return items.map(item => ({

    slug: item.slug,
    title: item.title,
    type: item.type,
    courseSlug: item.course.slug

}));

}

}