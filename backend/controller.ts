// deno-lint-ignore no-explicit-any
export async function getTestData ({response}: {response: any}) {
    const data = await Deno.readTextFile('./fakeData.json')
    response.body = JSON.parse(data)
}