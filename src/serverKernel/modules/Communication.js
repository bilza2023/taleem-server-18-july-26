// src/serverKernel/modules/Communication.js

export default class Communication {

	constructor(kernel) {

		this.kernel = kernel;

	}

	async list() {

		return this.kernel.db.communication.findMany({

			orderBy: {
				createdAt: "desc"
			}

		});

	}

	async get(id) {

		return this.kernel.db.communication.findUnique({

			where: {
				id
			}

		});

	}

	async listByReference(referenceId) {

		return this.kernel.db.communication.findMany({

			where: {
				referenceId
			},

			orderBy: {
				createdAt: "desc"
			}

		});

	}

	async create(data) {

		return this.kernel.db.communication.create({

			data

		});

	}

	async update(id, data) {

		return this.kernel.db.communication.update({

			where: {
				id
			},

			data

		});

	}

	async delete(id) {

		return this.kernel.db.communication.delete({

			where: {
				id
			}

		});

	}

}