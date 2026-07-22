const EMAIL = "admin@taleem.help";
const PASSWORD = "12345678";

async function main() {

	try {

		const res = await fetch(
			"http://localhost:3000/user/register",
			{
				method: "POST",

				headers: {
					"Content-Type": "application/json"
				},

				body: JSON.stringify({
					email: EMAIL,
					password: PASSWORD
				})
			}
		);

		const data = await res.json();

		console.log("Status:", res.status);
		console.log(data);

	}

	catch (err) {

		console.error(err);

	}

}

main();