export async function del(request) {
    const {search, searchParams} = new URL(request.url);
    const id = searchParams.get('id');
    const server = id.charAt(1); // Get server ID from 2nd letter of file ID
    const base = `https://api${server}.tempfiles.download`;
    const result = await fetch(base + '/delete/' + search, {method: 'DELETE'});
    if (result.status === 204) return result;
    return new Response(JSON.stringify({error: "No host available"}), {status: 502})
}
