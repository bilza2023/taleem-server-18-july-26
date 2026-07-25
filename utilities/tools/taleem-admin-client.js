//#region src/Connection.js
var e = class {
	constructor(e) {
		this.serverUrl = e, this.tokenKey = "taleem.token";
	}
	async login(e, t) {
		let n = await fetch(`${this.serverUrl}/api/user/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: e,
				password: t
			})
		});
		if (!n.ok) throw Error("Login failed.");
		let r = await n.json();
		return localStorage.setItem(this.tokenKey, r.token), r;
	}
	async fetch(e, t = {}) {
		let n = await fetch(`${this.serverUrl}${e}`, {
			...t,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.token()}`,
				...t.headers || {}
			}
		});
		if (!n.ok) throw Error(`Request failed (${n.status})`);
		return await n.json();
	}
	logout() {
		localStorage.removeItem(this.tokenKey);
	}
	token() {
		return localStorage.getItem(this.tokenKey);
	}
	isLoggedIn() {
		return this.token() !== null;
	}
	async verify() {
		try {
			return await this.fetch("/api/user/verify"), !0;
		} catch {
			return !1;
		}
	}
}, t = class {
	constructor(e) {
		this.connection = e;
	}
	async list() {
		return await this.connection.fetch("/api/admin/library");
	}
	async read(e) {
		return await this.connection.fetch(`/api/admin/library/${e}`);
	}
	async create(e) {
		return await this.connection.fetch("/api/admin/library", {
			method: "POST",
			body: JSON.stringify(e)
		});
	}
	async update(e, t) {
		return await this.connection.fetch(`/api/admin/library/${e}`, {
			method: "PUT",
			body: JSON.stringify(t)
		});
	}
	async remove(e) {
		return await this.connection.fetch(`/api/admin/library/${e}`, { method: "DELETE" });
	}
}, n = class {
	constructor(e) {
		this.connection = e;
	}
	async index() {
		return await this.connection.fetch("/api/course");
	}
	async read(e) {
		return await this.connection.fetch(`/api/course/${e}`);
	}
	async create(e) {
		return await this.connection.fetch("/api/admin/course", {
			method: "POST",
			body: JSON.stringify(e)
		});
	}
	async update(e, t) {
		return await this.connection.fetch(`/api/admin/course/${e}`, {
			method: "PUT",
			body: JSON.stringify(t)
		});
	}
	async remove(e) {
		return await this.connection.fetch(`/api/admin/course/${e}`, { method: "DELETE" });
	}
}, r = class {
	constructor(e) {
		this.connection = e;
	}
	async list() {
		return await this.connection.fetch("/api/admin/communication");
	}
	async read(e) {
		return await this.connection.fetch(`/api/admin/communication/${e}`);
	}
	async create(e) {
		return await this.connection.fetch("/api/admin/communication", {
			method: "POST",
			body: JSON.stringify(e)
		});
	}
	async update(e, t) {
		return await this.connection.fetch(`/api/admin/communication/${e}`, {
			method: "PUT",
			body: JSON.stringify(t)
		});
	}
	async remove(e) {
		return await this.connection.fetch(`/api/admin/communication/${e}`, { method: "DELETE" });
	}
}, i = class {
	constructor(e) {
		this.connection = e;
	}
	async list() {
		return await this.connection.fetch("/api/admin/subscription");
	}
	async read(e) {
		return await this.connection.fetch(`/api/admin/subscription/${e}`);
	}
	async create(e) {
		return await this.connection.fetch("/api/admin/subscription", {
			method: "POST",
			body: JSON.stringify(e)
		});
	}
	async update(e, t) {
		return await this.connection.fetch(`/api/admin/subscription/${e}`, {
			method: "PUT",
			body: JSON.stringify(t)
		});
	}
	async remove(e) {
		return await this.connection.fetch(`/api/admin/subscription/${e}`, { method: "DELETE" });
	}
}, a = class {
	constructor(a) {
		this.connection = new e(a), this.library = new t(this.connection), this.course = new n(this.connection), this.communication = new r(this.connection), this.subscription = new i(this.connection);
	}
	async login(e, t) {
		return await this.connection.login(e, t);
	}
	logout() {
		this.connection.logout();
	}
	isLoggedIn() {
		return this.connection.isLoggedIn();
	}
	verify() {
		return this.connection.verify();
	}
	token() {
		return this.connection.token();
	}
};
//#endregion
export { a as TaleemAdminClient };
