/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// https://time.com/tag/photo-of-the-day/
// get '.section-curated__primary .image-container'
// get data-src
// using cloudflare workers HTMLRewriter
// return 301 redirect to data-src

/* const rewriter = new HTMLRewriter() */
/* 	.on('.section-curated__primary .image-container', { */
/* 		element(element) { */
/* 			element.setAttribute('src', element.getAttribute('data-src')); */
/* 		}, */
/* 	}) */

/* export default { */
/* 	async fetch(request, env, ctx) { */
/* 		const res = await fetch('https://time.com/tag/photo-of-the-day/'); */
/* 		const html = await res.text(); */
/* 	}, */
/* }; */

let url;
const rewriter = new HTMLRewriter()
	.on('.section-curated__primary .image-container', {
		element(element) {
			url = element.getAttribute('data-src')
		},
	});

export default {
	async fetch(request, env, ctx) {
		const res = await fetch('https://time.com/tag/photo-of-the-day/');
		const html = await res.text();
		await rewriter.transform(new Response(html));
		return new Response(null, {
			status: 301,
			headers: {
				Location: url,
			},
		});
	},
};
