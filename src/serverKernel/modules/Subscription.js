// src/serverKernel/modules/Subscription.js

export default class Subscription {

	constructor(kernel) {

		this.kernel = kernel;

	}

	async list() {

		return this.kernel.db.subscription.findMany({

			orderBy: {
				startsAt: "desc"
			}

		});

	}

	async getById(id) {

		return this.kernel.db.subscription.findUnique({

			where: {
				id
			}

		});

	}

	async create(data) {

		return this.kernel.db.subscription.create({

			data

		});

	}

	async update(id, data) {

		return this.kernel.db.subscription.update({

			where: {
				id
			},

			data

		});

	}

	async delete(id) {

		return this.kernel.db.subscription.delete({

			where: {
				id
			}

		});

	}

	async listByUser(userId) {

		return this.kernel.db.subscription.findMany({

			where: {
				userId
			},

			orderBy: {
				startsAt: "desc"
			}

		});

	}

	async listByCourse(courseId) {

		return this.kernel.db.subscription.findMany({

			where: {
				courseId
			},

			orderBy: {
				startsAt: "desc"
			}

		});

	}

}