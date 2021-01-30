import express from 'express';

export abstract class CommonRoutesConfig {
	private _app: express.Application;
	private name: string;

	constructor(app: express.Application, name: string) {
		this._app = app;
		this.name = name;
		this.configureRoutes();
	}

	getName(): string {
		return this.name;
	}

	get app(): express.Application {
		return this._app;
	}

	abstract configureRoutes(): express.Application;
}
