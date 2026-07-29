// /scripts/bulk-seed/lorem.js

const WORDS = [
	"education",
	"student",
	"learning",
	"teacher",
	"science",
	"mathematics",
	"physics",
	"chemistry",
	"biology",
	"technology",
	"knowledge",
	"lesson",
	"course",
	"practice",
	"exercise",
	"problem",
	"solution",
	"future",
	"success",
	"school",
	"classroom",
	"concept",
	"example",
	"understanding",
	"reasoning",
	"experiment",
	"computer",
	"internet",
	"algorithm",
	"language"
];

function randomWord() {
	return WORDS[Math.floor(Math.random() * WORDS.length)];
}

export function title(words = 4) {
	return Array.from({ length: words }, randomWord)
		.map((word, index) =>
			index === 0
				? word.charAt(0).toUpperCase() + word.slice(1)
				: word
		)
		.join(" ");
}

export function sentence(words = 12) {
	const text = Array.from({ length: words }, randomWord).join(" ");
	return text.charAt(0).toUpperCase() + text.slice(1) + ".";
}

export function paragraph(sentences = 4) {
	return Array.from({ length: sentences }, () => sentence(10 + Math.floor(Math.random() * 8)))
		.join(" ");
}

export function html() {
	return `
<h2>${title()}</h2>
<p>${paragraph()}</p>
<p>${paragraph()}</p>
<p>${paragraph()}</p>
`.trim();
}