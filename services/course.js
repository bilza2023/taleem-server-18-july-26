// services/course.js

import * as courseRepository from "../repositories/course.js";

export async function index() {

	return await courseRepository.index();

}

export async function getCourse(slug) {

	return await courseRepository.findBySlug(slug);

}