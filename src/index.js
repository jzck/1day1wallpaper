/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// https://apod.nasa.gov/apod/astropix.html
// get SRC from IMG tag
// using cloudflare workers HTMLRewriter
// return 301 redirect to data-src

let path;
const rewriter = new HTMLRewriter()
	.on("img", {
		element(element) {
			path = element.getAttribute("src");
		},
	})

export default {
	async fetch(request, env, ctx) {
		const res = await fetch(`https://apod.nasa.gov/apod/astropix.html`);
		const html = await res.text();
		await rewriter.transform(new Response(html)).arrayBuffer();
		return new Response(null, {
			status: 302,
			headers: {
				Location: `https://apod.nasa.gov/apod/${path}`,
			},
		});
	},
};
