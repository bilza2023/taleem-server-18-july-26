// /scripts/bulk-seed/utils.js

import images from "./images.js";

export function randomItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}

export function randomImage() {
	return randomItem(images);
}

export function randomBoolean(probability = 0.5) {
	return Math.random() < probability;
}

export function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function slugify(text) {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}