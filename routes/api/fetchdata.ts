export const GET = async (request: Request) => {
    const testReport = await (await fetch("http://localhost/api/report")).json()
    const versionList = await (await fetch("http://localhost/api/release")).json()
    const coverage = await (await fetch("https://codecov.io/gh/officedev/teamsfx/branch/dev/graphs/tree.svg?token=92B3L61UNM")).text()
    return new Response(JSON.stringify({
        errMsg: 'ok',
        data: {testReport, versionList, coverage}
    }), {
        headers: {
            'content-type': 'application/json'
        }
    })
}
