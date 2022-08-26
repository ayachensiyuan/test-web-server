import Mongo from '../../utils/mongodb.ts'
import { verifyToken } from '../../utils/tools.ts'
import { CaseSchema, TestSchema, MochawesomeData, ReportSchema } from '../../utils/schema.ts'

const cleanReport = (data: MochawesomeData) => {
    const report: ReportSchema = {
        
    }
    return report
}

const cleanData = (data: MochawesomeData) => {
    const mochaTests = data.results[0].suites[0].tests
    const tests: TestSchema[] = []
    for (let i = 0; i < mochaTests.length; i++) {
        const test: TestSchema = {
            uuid: mochaTests[i].uuid,
            parentUUID: mochaTests[i].parentUUID,
            title: mochaTests[i].title,
            fullTitle: mochaTests[i].fullTitle,
            duration: mochaTests[i].duration,
            state: mochaTests[i].state,
            pass: mochaTests[i].pass,
            pending: mochaTests[i].pending,
            fail: mochaTests[i].fail,
            code: mochaTests[i].code,
            err: {
                message: mochaTests[i].err.message,
                estack: mochaTests[i].err.estack,
                diff: mochaTests[i].err.diff
            }
        }
        tests.push(test)
    }

    const testCase: CaseSchema = {
        uuid: data.results[0].suites[0].uuid,
        title: data.results[0].suites[0].title,
        fullFile: data.results[0].suites[0].fullFile,
        file: data.results[0].suites[0].file,
        start: data.stats.start,
        end: data.stats.end,
        passes: data.results[0].suites[0].passes,
        failures: data.results[0].suites[0].failures,
        pending: data.results[0].suites[0].pending,
        state: data.results[0].suites[0].failures.length > 0 ? 'fail' : 'pass',
        duration: data.stats.duration,
        tests,
        meta: {
            mocha: {
                version: data.meta.mocha.version
            },
            mochawesome: {
                version: data.meta.mochawesome.version
            },
            marge: {
                version: data.meta.marge.version
            }
        },
        author: data.author,
        caseURL: data.caseURL,
        jobId: data.jobId,
        parentRunId: data.parentRunId,
        coreVersion: data.coreVersion,
        os: data.os,
        nodeVersion: data.nodeVersion,
        targetType: data.targetType,
        slowMethod: data.slowMethod
    }
    return testCase
}

export const POST = async (request: Request) => {
    const isAuth = verifyToken(request.headers)
    if (isAuth) {
        const data = await request.json()
        const testCase = cleanData(data)
        const mongo = new Mongo()
        await mongo.connect()
        const results = await mongo.insertOne('testcases', testCase)

        // update reports
        const report = cleanReport(data)
        await mongo.updateOne('reports',{runid: 'XXX'}, {...report})

        mongo.close()

        return new Response(JSON.stringify(results), {
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            status: 200
        })
    } else {
        return new Response(JSON.stringify({ errMsg: 'unauthorization !!!' }), {
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            status: 401
        })
    }
}
