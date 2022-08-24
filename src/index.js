/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
const n_max = 2;

async function sendRequest(url, body) {
    const init = {
        body: body,
        method: 'POST'
    };
    const resp = await fetch(url, init);
    return gatherResponse(resp);
}

async function gatherResponse(response) {
    const {headers} = response;
    const contentType = headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        return JSON.stringify(await response.json());
    } else if (contentType.includes('application/text')) {
        return response.text();
    } else if (contentType.includes('text/html')) {
        return response.text();
    } else {
        return response.text();
    }
}

async function handleRequest(request) {
    const body = await request.formData();
    const url = new URL(request.url);
    const {pathname, search} = url;
    const rand = Math.floor(Math.random() * n_max) + 1;
    const base = `https://api${rand}.tempfiles.download`;
    const destinationURL = base + pathname + search;
    return new Response(await sendRequest(destinationURL, body), {
        headers: {
            'Access-Control-Request-Method': 'GET,HEAD,POST,DELETE,OPTIONS',
            'Access-Control-Allow-Origin': '*'
        }
    })
}

export default {
    async fetch(request) {
        return await handleRequest(request);
    },
};
