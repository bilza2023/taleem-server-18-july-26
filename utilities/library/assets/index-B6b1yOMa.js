(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e){this.serverUrl=e,this.tokenKey=`taleem.token`}async login(e,t){let n=await fetch(`${this.serverUrl}/api/user/login`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({email:e,password:t})});if(!n.ok)throw Error(`Login failed.`);let r=await n.json();return localStorage.setItem(this.tokenKey,r.token),r}async fetch(e,t={}){let n=await fetch(`${this.serverUrl}${e}`,{...t,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${this.token()}`,...t.headers||{}}});if(!n.ok)throw Error(`Request failed (${n.status})`);return await n.json()}logout(){localStorage.removeItem(this.tokenKey)}token(){return localStorage.getItem(this.tokenKey)}isLoggedIn(){return this.token()!==null}async verify(){try{return await this.fetch(`/api/user/verify`),!0}catch{return!1}}},t=class{constructor(e){this.connection=e}async list(){return await this.connection.fetch(`/api/admin/library`)}async read(e){return await this.connection.fetch(`/api/admin/library/${e}`)}async create(e){return await this.connection.fetch(`/api/admin/library`,{method:`POST`,body:JSON.stringify(e)})}async update(e,t){return await this.connection.fetch(`/api/admin/library/${e}`,{method:`PUT`,body:JSON.stringify(t)})}async remove(e){return await this.connection.fetch(`/api/admin/library/${e}`,{method:`DELETE`})}},n=class{constructor(e){this.connection=e}async list(){return await this.connection.fetch(`/api/admin/course`)}async read(e){return await this.connection.fetch(`/api/admin/course/${e}`)}async create(e){return await this.connection.fetch(`/api/admin/course`,{method:`POST`,body:JSON.stringify(e)})}async update(e,t){return await this.connection.fetch(`/api/admin/course/${e}`,{method:`PUT`,body:JSON.stringify(t)})}async remove(e){return await this.connection.fetch(`/api/admin/course/${e}`,{method:`DELETE`})}},r=class{constructor(e){this.connection=e}async list(){return await this.connection.fetch(`/api/admin/communication`)}async read(e){return await this.connection.fetch(`/api/admin/communication/${e}`)}async create(e){return await this.connection.fetch(`/api/admin/communication`,{method:`POST`,body:JSON.stringify(e)})}async update(e,t){return await this.connection.fetch(`/api/admin/communication/${e}`,{method:`PUT`,body:JSON.stringify(t)})}async remove(e){return await this.connection.fetch(`/api/admin/communication/${e}`,{method:`DELETE`})}},i=class{constructor(e){this.connection=e}async list(){return await this.connection.fetch(`/api/admin/subscription`)}async read(e){return await this.connection.fetch(`/api/admin/subscription/${e}`)}async create(e){return await this.connection.fetch(`/api/admin/subscription`,{method:`POST`,body:JSON.stringify(e)})}async update(e,t){return await this.connection.fetch(`/api/admin/subscription/${e}`,{method:`PUT`,body:JSON.stringify(t)})}async remove(e){return await this.connection.fetch(`/api/admin/subscription/${e}`,{method:`DELETE`})}},a=new class{constructor(a){this.connection=new e(a),this.library=new t(this.connection),this.course=new n(this.connection),this.communication=new r(this.connection),this.subscription=new i(this.connection)}async login(e,t){return await this.connection.login(e,t)}logout(){this.connection.logout()}isLoggedIn(){return this.connection.isLoggedIn()}verify(){return this.connection.verify()}token(){return this.connection.token()}}(`http://127.0.0.1:9000`);function o(){let e=document.createElement(`header`);e.className=`header`;let t=document.createElement(`h1`);t.textContent=`Taleem Library Utility`;let n=document.createElement(`button`);return n.textContent=`Logout`,n.onclick=async()=>{await a.connection.logout(),location.reload()},e.appendChild(t),e.appendChild(n),e}function s(e={}){let t=document.createElement(`form`);return t.innerHTML=`

		<div>

			<label>Slug</label><br>

			<input
				name="slug"
				value="${e.slug??``}"
			/>

		</div>

		<br>

		<div>

			<label>Title</label><br>

			<input
				name="title"
				value="${e.title??``}"
			/>

		</div>

		<br>

		<div>

			<label>Description</label><br>

			<textarea
				name="description"
			>${e.description??``}</textarea>

		</div>

		<br>

		<div>

			<label>Course</label><br>

			<input
				name="courseId"
				value="${e.courseId??``}"
			/>

		</div>

		<br>

		<div>

			<label>Type</label><br>

			<select name="type">

				<option value="HTML"
					${e.type===`HTML`?`selected`:``}>
					HTML
				</option>

				<option value="MARKDOWN"
					${e.type===`MARKDOWN`?`selected`:``}>
					MARKDOWN
				</option>

				<option value="TEXT"
					${e.type===`TEXT`?`selected`:``}>
					TEXT
				</option>

				<option value="JSON"
					${e.type===`JSON`?`selected`:``}>
					JSON
				</option>

			</select>

		</div>

		<br>

		<div>

			<label>Body</label><br>

			<textarea
				name="body"
				rows="20"
			>${e.body??``}</textarea>

		</div>

		<br>

		<button type="submit">

			Save

		</button>

	`,t}async function c(e){document.body.innerHTML=``,document.body.appendChild(o());let t=s(await a.library.read(e));t.onsubmit=async n=>{n.preventDefault();let r=Object.fromEntries(new FormData(t));await a.library.update(e,r),alert(`Library item saved.`)},document.body.appendChild(t)}async function l(){document.body.innerHTML=``,document.body.appendChild(o());let e=s({slug:``,title:``,description:``,courseId:``,type:`HTML`,body:``});e.onsubmit=async t=>{t.preventDefault();let n=Object.fromEntries(new FormData(e));await a.library.create(n),alert(`Library item created.`),await u()},document.body.appendChild(e)}async function u(){document.body.innerHTML=``,document.body.appendChild(o());let e=document.createElement(`h2`);e.textContent=`Library`,document.body.appendChild(e);let t=document.createElement(`button`);t.textContent=`New`,t.onclick=()=>{l()},document.body.appendChild(t),document.body.appendChild(document.createElement(`hr`));let n=document.createElement(`table`);n.border=`1`,n.cellPadding=`8`,n.innerHTML=`

		<tr>

			<th>Slug</th>

			<th>Title</th>

			<th>Course</th>

			<th>Type</th>

			<th></th>

		</tr>

	`;let r=await a.library.list();for(let e of r){let t=document.createElement(`tr`);t.innerHTML=`

			<td>${e.slug}</td>

			<td>${e.title}</td>

			<td>${e.courseId}</td>

			<td>${e.type}</td>

		`;let r=document.createElement(`td`),i=document.createElement(`button`);i.textContent=`Edit`,i.onclick=()=>{c(e.slug)},r.appendChild(i),t.appendChild(r),n.appendChild(t)}document.body.appendChild(n)}function d(){document.body.innerHTML=``;let e=document.createElement(`h1`);e.textContent=`Taleem Library Utility`,document.body.appendChild(e);let t=document.createElement(`form`);t.innerHTML=`

		<div>

			<label>Email</label><br>

			<input
				type="email"
				name="email"
				value="library-admin@example.com"
				required
			/>

		</div>

		<br>

		<div>

			<label>Password</label><br>

			<input
				type="password"
				name="password"
				value="12345678"
				required
			/>

		</div>

		<br>

		<button type="submit">

			Login

		</button>

	`,t.onsubmit=async e=>{e.preventDefault();let n=Object.fromEntries(new FormData(t));try{await a.connection.login(n.email,n.password),await u()}catch{alert(`Login failed.`)}},document.body.appendChild(t)}async function f(){if(a.connection.isLoggedIn())try{await a.connection.verify(),await u();return}catch{a.connection.logout()}d()}document.addEventListener(`DOMContentLoaded`,async()=>{await f()});