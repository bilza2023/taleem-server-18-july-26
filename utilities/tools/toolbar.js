// --------------------------------------------------
// Taleem Toolbar
// --------------------------------------------------

(function () {

	if (document.getElementById("taleem-toolbar")) {

		return;

	}

	const server =
		localStorage.getItem(
			"taleem-server-url"
		) ?? "http://127.0.0.1:9000";

	const email =
		localStorage.getItem(
			"taleem-server-email"
		) ?? "";

	const password =
		localStorage.getItem(
			"taleem-server-password"
		) ?? "";

	const connected =
		email &&
		password;

	document.head.insertAdjacentHTML(

		"beforeend",

		`
<style>

#taleem-toolbar{

	display:flex;
	align-items:center;
	gap:8px;

	padding:6px 10px;

	background:#222;
	color:#fff;

	border-bottom:1px solid #444;

	font:14px sans-serif;

}

#taleem-toolbar label{

	white-space:nowrap;

}

#taleem-toolbar input{

	padding:4px 6px;

	margin:0;

	background:#333;
	color:#fff;

	border:1px solid #555;

}

#toolbar-server{

	width:220px;

}

#toolbar-email{

	width:220px;

}

#toolbar-password{

	width:140px;

}

#taleem-toolbar button{

	padding:4px 10px;

	margin:0;

}

#toolbar-status{

	font-weight:bold;

	margin-right:12px;

}

</style>
`

	);

	document.body.insertAdjacentHTML(

		"afterbegin",

		`

<div id="taleem-toolbar">

	<label>

		🌐

	</label>

	<input

		id="toolbar-server"

		value="${server}"

	>

	${
		connected

			?

			`

<span id="toolbar-status">

	🟢 ${email}

</span>

<button id="toolbar-logout">

	Logout

</button>

`

			:

			`

<label>

	👤

</label>

<input

	id="toolbar-email"

	value="${email}"

>

<label>

	🔑

</label>

<input

	id="toolbar-password"

	type="password"

	value="${password}"

>

<button id="toolbar-connect">

	Connect

</button>

`

	}

</div>

`

	);

	if (connected) {

		document
			.getElementById(
				"toolbar-logout"
			)
			.onclick = () => {

				localStorage.removeItem(
					"taleem-server-url"
				);

				localStorage.removeItem(
					"taleem-server-email"
				);

				localStorage.removeItem(
					"taleem-server-password"
				);

				location.reload();

			};

	}

	else {

		document
			.getElementById(
				"toolbar-connect"
			)
			.onclick = () => {

				localStorage.setItem(

					"taleem-server-url",

					document.getElementById(
						"toolbar-server"
					).value

				);

				localStorage.setItem(

					"taleem-server-email",

					document.getElementById(
						"toolbar-email"
					).value

				);

				localStorage.setItem(

					"taleem-server-password",

					document.getElementById(
						"toolbar-password"
					).value

				);

				location.reload();

			};

	}

})();