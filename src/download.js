export async function download(request) {
    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');
    const password = searchParams.get('p');
    const server = id.charAt(1); // Get server ID from 2nd letter of file ID
    const api_base = `https://api${server}.tempfiles.download`;
    const d_base = `https://d${server}.tempfiles.download`;
    try {
        if (server === '3') {
            return await API3.fetch(`${api_base}/${id}/${password}`);
        } else {
            return await fetch(`${d_base}/${id}/?p=${password}`);
        }
    } catch (e) {
        return new Request(e.message, {status: e.status})
    }
}
