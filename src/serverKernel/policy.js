// src/serverKernel/Policy.js

import Permission from "./enums/Permission.js";

export default class Policy {

	constructor(kernel) {

		this.kernel = kernel;

	}

	// Require a permission for an admin on a course.
	async require(admin, courseId, permission) {

		if (!Object.values(Permission).includes(permission)) {

			throw new Error(
				`Policy.require(): Unknown permission '${permission}'.`
			);

		}

		const policy =
			await this.kernel.db.adminCoursePolicy.findUnique({

				where: {
					adminId_courseId: {
						adminId: admin.id,
						courseId
					}
				}

			});

		if (!policy) {

			throw new Error(
				`Policy.require(): Admin '${admin.email}' has no policy for course '${courseId}'.`
			);

		}

		if (!policy[permission]) {

			throw new Error(
				`Policy.require(): '${permission}' permission denied for admin '${admin.email}' on course '${courseId}'.`
			);

		}

		return policy;

	}

}