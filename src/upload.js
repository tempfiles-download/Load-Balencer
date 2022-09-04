const n_max = 3;

export function upload(request) {
    return handleRequest(request);
}

async function handleRequest(request) {
    const {search} = new URL(request.url);
    const rand = Math.floor(Math.random() * n_max) + 1;
    const base = `https://api${rand}.tempfiles.download`;
    const init = {
        body: await request.formData(),
        method: 'POST'
    };
    try {
        if (rand === 3) {
            const result = await API3.fetch(base, init);
            if (result.status === 201) return result;
        } else {
            const result = await fetch(base + '/upload/' + search, init);
            if (result.status === 201) return result;
        }
    } catch (e) {
        return new Request(e.message, {status: e.status})
    }
    return new Response(JSON.stringify({error: "No host available"}), {status: 502})
}
