// --------------------------------------------------
// Populate Courses
// --------------------------------------------------

export async function populateCourses(select, api, options = {}) {

	const {

		placeholder = "Select a course",
		includeBlank = true,
		selected = ""

	} = options;

	const courses = await api.course.index();

	select.innerHTML = "";

	if (includeBlank) {

		select.append(
			new Option(placeholder, "")
		);

	}

	for (const course of courses) {

		const option = new Option(
			course.title,
			course.id
		);

		if (course.id === selected) {

			option.selected = true;

		}

		select.append(option);

	}

}