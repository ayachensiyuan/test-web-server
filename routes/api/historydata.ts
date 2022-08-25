export const GET = async () => {
    const data = await Deno.readTextFile('./fakeHistoryData.json')
    return new Response(data, {
        headers: {
            'content-type': 'application/json'
        }
    })
}