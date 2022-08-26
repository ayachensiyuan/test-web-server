export const GET = async () => {
    const data = await Deno.readTextFile('test-web-server/fakeData.json')
    return new Response(JSON.stringify(Deno.env.toObject()), {
        headers: {
            'content-type': 'application/json'
        }
    })
}
