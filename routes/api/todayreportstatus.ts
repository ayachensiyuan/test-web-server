export const GET = async () => {
    const data = await Deno.readTextFile('web-server/fakeData.json')
    return new Response(data, {
        headers: {
            'content-type': 'application/json'
        }
    })
}
