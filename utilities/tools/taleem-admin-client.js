//#region src/fetch.js
async function e(e, t, n, r = null) {
	let i = {
		method: t,
		headers: { Authorization: `Bearer ${e.token}` }
	};
	r !== null && (i.headers["Content-Type"] = "application/json", i.body = JSON.stringify(r));
	let a;
	try {
		a = await fetch(`${e.server}${n}`, i);
	} catch {
		throw Error(`Unable to contact Taleem Server.

Server:
${e.server}

Please make sure the server is running and accessible.`);
	}
	let o = null;
	try {
		o = await a.json();
	} catch {}
	if (!a.ok) switch (a.status) {
		case 400: throw Error(o?.message ?? "The request is invalid.");
		case 401: throw Error("Your session has expired. Please log in again.");
		case 403: throw Error(o?.message ?? "You do not have permission to perform this action.");
		case 404: throw Error(o?.message ?? "The requested API endpoint or resource was not found.");
		case 409: throw Error(o?.message ?? "The operation could not be completed because the data already exists.");
		case 422: throw Error(o?.message ?? "The submitted data is not valid.");
		case 500: throw Error(o?.message ?? "The Taleem Server encountered an internal error.");
		default: throw Error(o?.message ?? `Unexpected server error (${a.status}).`);
	}
	return o;
}
//#endregion
//#region src/library.js
function t(t) {
	return {
		list() {
			return e(t, "GET", "/api/admin/library");
		},
		read(n) {
			return e(t, "GET", `/api/admin/library/${n}`);
		},
		create(n, r, i, a, o) {
			return e(t, "POST", "/api/admin/library", {
				slug: n,
				title: r,
				courseId: i,
				type: a,
				body: o
			});
		},
		update(n, r, i, a, o) {
			return e(t, "PUT", `/api/admin/library/${n}`, {
				title: r,
				courseId: i,
				type: a,
				body: o
			});
		},
		remove(n) {
			return e(t, "DELETE", `/api/admin/library/${n}`);
		}
	};
}
//#endregion
//#region src/course.js
function n(t) {
	return {
		list() {
			return e(t, "GET", "/api/admin/course");
		},
		read(n) {
			return e(t, "GET", `/api/admin/course/${n}`);
		},
		create(n, r, i) {
			return e(t, "POST", "/api/admin/course", {
				slug: n,
				title: r,
				access: i
			});
		},
		update(n, r, i) {
			return e(t, "PUT", `/api/admin/course/${n}`, {
				title: r,
				access: i
			});
		},
		remove(n) {
			return e(t, "DELETE", `/api/admin/course/${n}`);
		}
	};
}
//#endregion
//#region src/communication.js
function r(t) {
	return {
		list() {
			return e(t, "GET", "/api/admin/communication");
		},
		read(n) {
			return e(t, "GET", `/api/admin/communication/${n}`);
		},
		create(n) {
			return e(t, "POST", "/api/admin/communication", n);
		},
		update(n, r) {
			return e(t, "PUT", `/api/admin/communication/${n}`, r);
		},
		remove(n) {
			return e(t, "DELETE", `/api/admin/communication/${n}`);
		}
	};
}
//#endregion
//#region src/subscription.js
function i(t) {
	return {
		list() {
			return e(t, "GET", "/api/admin/subscription");
		},
		read(n) {
			return e(t, "GET", `/api/admin/subscription/${n}`);
		},
		create(n) {
			return e(t, "POST", "/api/admin/subscription", n);
		},
		update(n, r) {
			return e(t, "PUT", `/api/admin/subscription/${n}`, r);
		}
	};
}
//#endregion
//#region src/TaleemAdminClient.js
var a = class {
	constructor(e, a) {
		this.server = e, this.token = a, this.library = t(this), this.course = n(this), this.communication = r(this), this.subscription = i(this);
	}
};
//#endregion
export { a as TaleemAdminClient };
