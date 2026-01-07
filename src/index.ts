/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { handleQuery } from './commands';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const q = url.searchParams.get('q');

		if (q) {
			const redirectUrl = handleQuery(q);
			return Response.redirect(redirectUrl, 302);
		} else {
			return new Response('Please provide a "q" parameter in the URL. Example: ?q=yourquery');
		}
	},
} satisfies ExportedHandler<Env>;

