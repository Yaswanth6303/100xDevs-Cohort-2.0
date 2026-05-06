/**
 * Welcome to Cloudflare Workers!
 *
 * This is your first Cloudflare Worker script.
 * A Worker is a lightweight JavaScript function that runs on Cloudflare’s global network.
 *
 * To get started:
 * - Run `npm run dev` in your terminal to start a local development server.
 * - Then open your browser at http://localhost:8787/ to see your Worker running.
 * - Once you’re ready to publish, run `npm run deploy` to deploy your Worker to Cloudflare.
 *
 * Configuration:
 * - Bind any required resources (like KV storage, D1, R2, etc.) in your `wrangler.jsonc` file.
 * - After adding bindings, regenerate type definitions for the `Env` object by running `npm run cf-typegen`.
 *
 * Learn more here: https://developers.cloudflare.com/workers/
 */

/**
 * Wrangler is the official CLI tool for managing Cloudflare Workers.
 * It allows you to:
 *  - Develop locally with live reload.
 *  - Deploy your Workers globally to Cloudflare’s network.
 *  - Manage configuration, secrets, bindings, and more.
 */

export default {
	/**
	 * The `fetch` method is the main entry point for Cloudflare Workers.
	 *
	 * Every Worker must export an object with a `fetch` function.
	 * This function receives incoming HTTP requests and must return a response.
	 *
	 * @param request - The incoming HTTP request object. It provides access to:
	 *                  - request.method (GET, POST, etc.)
	 *                  - request.url (the full URL of the request)
	 *                  - request.headers (HTTP headers)
	 *                  - request.body (request data for POST/PUT requests)
	 *
	 * @param env - An object containing environment variables and bindings defined in `wrangler.jsonc`.
	 *              For example, database connections, secrets, or API keys.
	 *
	 * @param ctx - The execution context. It provides lifecycle controls such as:
	 *              - ctx.waitUntil(promise): Keep the Worker alive until an async task completes.
	 *              - ctx.passThroughOnException(): Allow the request to continue if an exception occurs.
	 *
	 * @returns A Response object that will be sent back to the client.
	 */
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		/**
		 * The `request` object gives access to important HTTP request data such as:
		 *  - `request.method` → The HTTP method (e.g., GET, POST, PUT, DELETE)
		 *  - `request.url` → The complete URL that was requested
		 *  - `request.headers` → All the headers sent by the client
		 *  - `request.body` → The request body (for POST/PUT requests)
		 *
		 * Using this information, we can control how our Worker responds to different types of requests.
		 */
		console.log(request.body);
		console.log(request.headers);

		// Check the HTTP method of the request.
		// If it's a GET request, respond with a success message.
		if (request.method === 'GET') {
			return Response.json({
				message: 'You sent a GET request',
			});
		}
		// For any other request methods (e.g., POST, PUT, DELETE), send a different message.
		else {
			return Response.json({
				message: 'You did not send a GET request',
			});
		}
	},
} satisfies ExportedHandler<Env>;

/**
 * Unlike Express.js (or other Node.js frameworks), Cloudflare Workers do not use a router object.
 *
 * In Express, we usually define routes like:
 *   app.get('/users', handler);
 *   app.post('/login', handler);
 *
 * However, in Cloudflare Workers, we don't have this abstraction.
 * Instead, we handle all incoming requests directly inside the `fetch` function using the `request` object.
 *
 * This means:
 *  - We must manually check the request method (GET, POST, etc.)
 *  - We must manually parse the request URL to determine which endpoint or logic to execute
 *
 * Note:
 * Using the `fetch` function directly can make complex applications harder to manage,
 * especially if you have many routes and business logic.
 * To make it scalable, developers often use lightweight routing libraries
 * (like `itty-router`, `hono`, or `worktop`) to organize routes and simplify request handling.
 */

