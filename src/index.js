const n_max = 2;

async function handleRequest(request) {
    const {pathname, search} = new URL(request.url);
    for (let i = 0; i < (n_max * 2); i++) {
        const rand = Math.floor(Math.random() * n_max) + 1;
        const base = `https://api${rand}.tempfiles.download`;
        const init = {
            body: await request.formData(), method: 'POST'
        };
        const result = await fetch(base + pathname + search, init);
        if (result.status === 201) return result;
    }
    return new Response(JSON.stringify({error: "No host available"}), {status: 502})
}

export default {
    async fetch(request) {
        return await handleRequest(request);
    },
};
