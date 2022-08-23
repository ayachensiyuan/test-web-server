export const GET = async (req: Request) => {
    const data = await Deno.readTextFile('./fakeData.json')
    return new Response(data, {
        headers: {
            'content-type': 'application/json'
        }
    })
}