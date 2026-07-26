// src/serverKernel/ServerKernel.js

import { PrismaClient } from "@prisma/client";

import Config from "./Config.js";
import JWT from "./JWT.js";
import Auth from "./Auth.js";
import Logger from "./Logger.js";

import User from "./modules/User.js";
import Admin from "./modules/Admin.js";
import Library from "./modules/Library.js";
import Course from "./modules/Course.js";
import Communication from "./modules/Communication.js";
import Subscription from "./modules/Subscription.js";

class ServerKernel {

	constructor() {

		// --------------------------------------------------
		// Core
		// --------------------------------------------------

		this.config = new Config();

		this.logger = new Logger();

		this.db = new PrismaClient();

		this.jwt = new JWT(this);

		this.auth = new Auth(this);

		// --------------------------------------------------
		// Modules
		// --------------------------------------------------

		this.user = new User(this);

		this.admin = new Admin(this);

		this.library = new Library(this);

		this.course = new Course(this);

		this.communication = new Communication(this);

		this.subscription = new Subscription(this);

	}

	async shutdown() {

		await this.db.$disconnect();

	}

}

const kernel = new ServerKernel();

export default kernel;