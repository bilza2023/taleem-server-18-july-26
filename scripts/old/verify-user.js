const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkB0YWxlZW0uaGVscCIsImlhdCI6MTc4NDM3MzgyMCwiZXhwIjoxNzg2OTY1ODIwfQ.KCrnuQDtZ6M9gkdIVY1bXSOmGN6ldSg5e_XgTxndsNk";

async function main() {

	try {

		const res = await fetch(
			"http://localhost:3000/user/verify",
			{
				headers: {
					Authorization: `Bearer ${TOKEN}`
				}
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