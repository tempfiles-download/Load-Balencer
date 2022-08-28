const n_max = 2;

export async function download(url) {
    const {search} = new URL(url);
    for (let i = 0; i < (n_max * 2); i++) {
        const rand = Math.floor(Math.random() * n_max) + 1;
        const base = `https://api${rand}.tempfiles.download`;
        const result = await fetch(base + '/download/' + search);
        if (result.status === 200) return result;
    }
    return new Response(JSON.stringify({error: "No host available"}), {status: 502})
}
