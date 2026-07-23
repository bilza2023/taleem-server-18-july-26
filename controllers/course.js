import * as courseService from "../services/course.js";

export async function index(req, res) {

	try {

		const courses = await courseService.index();

		res.json(courses);

	} catch (err) {

		res.status(500).json({
			error: err.message
		});

	}

}

export async function getCourse(req, res) {

	try {

		const course = await courseService.getCourse(
			req.params.slug
		);

		if (!course) {

			return res.status(404).json({
				error: "Course not found"
			});

		}

		res.json(course);

	} catch (err) {

		res.status(500).json({
			error: err.message
		});

	}

}