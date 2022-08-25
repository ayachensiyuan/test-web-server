export const GET = async () => {
    const data = await Deno.readTextFile('./fakeData.json')
    return new Response(data, {
        headers: {
            'content-type': 'application/json'
        }
    })
}
