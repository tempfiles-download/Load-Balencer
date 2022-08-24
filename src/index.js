const n_max = 2;

async function handleRequest(request) {
    const body = await request.formData();
    const url = new URL(request.url);
    const {pathname, search} = url;
    for (let i = 0; i < 10; i++) {
        const rand = Math.floor(Math.random() * n_max) + 1;
        const base = `https://api${rand}.tempfiles.download`;
        const destinationURL = base + pathname + search;
        const init = {
            body: body,
            method: 'POST'
        };
        const result = await fetch(destinationURL, init);
        if (result.status === 201) return result;
    }
    return new Response(JSON.stringify({error: "No host available"}), {status: 502})
}

export default {
    async fetch(request) {
        return await handleRequest(request);
    },
};
