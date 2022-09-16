export const GET = async (request: Request) => {
    const testReport = await (await fetch("http://localhost/api/report")).json()
    const versionList = await (await fetch("http://localhost/api/release")).json()
    return new Response(JSON.stringify({
        errMsg: 'ok',
        data: {testReport, versionList}
    }), {
        headers: {
            'content-type': 'application/json'
        }
    })
}
