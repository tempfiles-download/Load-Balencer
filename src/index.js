const n_max = 2;

async function getHost() {
    while (true) {
        const rand = Math.floor(Math.random() * n_max) + 1;
        const base = `https://api${rand}.tempfiles.download`;
        if ((await fetch(`${base}/ping/`)).status === 200) return base;
    }
}

async function handleRequest(request) {
    const body = await request.formData();
    const url = new URL(request.url);
    const {pathname, search} = url;
    const base = await getHost();
    const destinationURL = base + pathname + search;
    const init = {
        body: body,
        method: 'POST'
    };
    return await fetch(destinationURL, init);
}

export default {
    async fetch(request) {
        return await handleRequest(request);
    },
};
