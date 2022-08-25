import { reportCardInterface } from "../../utils/interface.d.ts"
export const GET = async (request: Request) => {
    const id = new URL(request.url).searchParams.get('reportId')
    const data = await Deno.readTextFile('test-web-server/fakeData.json')
    const jsonData = JSON.parse(data)
    let target:reportCardInterface = {
        testReportName: "",
        testTotalStatus: "operational",
        reportId: 0,
        reportStatus: "GET"
    }

    if(id) {
        for(let i = 0; i < jsonData.data.length; i++) {
            if(jsonData.data[i].reportId == parseInt(id)) {
                target = jsonData.data[i]
                return new Response(JSON.stringify(target), {
                    headers: {
                        'content-type': 'application/json'
                    }
                }) 
            }
        }
        if(target.reportStatus == "OUT_OF_DATA") {
            return new Response(JSON.stringify({errMsg: 'no data!!!', status: 400}), {
                headers: {
                    'content-type': 'application/json'
                }
            })
        }

    } else {
        return new Response(JSON.stringify({errMsg: 'error parmas!!!'}), {
                    headers: {
                        'content-type': 'application/json',
                    }
                })
    }
}