import Mongo from '../../utils/mongodb.ts'
import { verifyToken } from '../../utils/tools.ts'
import { CaseSchema, TestSchema, MochawesomeData, ReportSchema, GithubData, reportNameEnum } from '../../utils/schema.ts'

const updateReport = async (testCase: CaseSchema, db: Mongo) => {
    const result = await db.findOne('reports', { runId: testCase.runId })
    try {
        if (result.state === 'fail') {
            // new report
            console.log('new report...')
            const report: ReportSchema = {
                runId: testCase.runId,
                on: testCase.on,
                passes: testCase.state === 'pass' ? 1 : 0,
                failures: testCase.state === 'fail' ? 1 : 0,
                pending: testCase.state === 'pending' ? 1 : 0,
                cases: [testCase],
                reportName: reportNameEnum[testCase.reportId],
                reportState: 'GET',
                reportId: testCase.reportId,
                duration: testCase.duration,
                reportDate: [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('-'),
                reportStartTime: testCase.start,
                reportEndTime: testCase.end,
                casesCount: 1
            }
            const res = await db.insertOne('reports', report)
            console.log(res)
            return true
        } else {
            // update report
            console.log('update report...')
            const report = result.data as ReportSchema
            report.passes = testCase.state === 'pass' ? report.passes++ : 0
            report.failures = testCase.state === 'fail' ? report.failures++ : 0
            report.pending = testCase.state === 'pending' ? report.pending++ : 0
            report.cases.push(testCase)
            report.casesCount = report.casesCount++
            report.reportEndTime = testCase.end
            report.duration = report.reportEndTime.getTime() - report.reportStartTime.getTime()

            await db.updateOne('reports', { runId: testCase.runId }, report)
            return true
        }
    } catch (error) {
        return {state: false, error}
    }
}

const cleanData = (data: { mochawesomeData: MochawesomeData, githubData: GithubData }) => {
    const { mochawesomeData, githubData } = data
    if (!mochawesomeData.results || !mochawesomeData.results[0].suites || !githubData.jobId || !githubData.runId || !githubData.reportId) return
    const mochaTests = mochawesomeData.results[0]?.suites[0]?.tests
    const tests: TestSchema[] = []
    if (typeof mochaTests === 'undefined') return
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
        uuid: mochawesomeData.results[0].suites[0].uuid,
        title: mochawesomeData.results[0].suites[0].title,
        fullFile: mochawesomeData.results[0].suites[0].fullFile,
        file: mochawesomeData.results[0].suites[0].file,
        start: new Date(mochawesomeData.stats.start),
        end: new Date(mochawesomeData.stats.end),
        passes: mochawesomeData.results[0].suites[0].passes,
        failures: mochawesomeData.results[0].suites[0].failures,
        pending: mochawesomeData.results[0].suites[0].pending,
        state: mochawesomeData.results[0].suites[0].failures.length > 0 ? 'fail' : 'pass',
        duration: mochawesomeData.stats.duration,
        tests,
        meta: {
            mocha: {
                version: mochawesomeData.meta.mocha.version
            },
            mochawesome: {
                version: mochawesomeData.meta.mochawesome.version
            },
            marge: {
                version: mochawesomeData.meta.marge.version
            }
        },
        author: githubData.author,
        caseURL: githubData.caseURL,
        jobId: githubData.jobId,
        runId: githubData.runId,
        coreVersion: githubData.coreVersion,
        os: githubData.os,
        nodeVersion: githubData.nodeVersion,
        targetType: githubData.targetType,
        slowMethod: githubData.slowMethod,
        reportId: githubData.reportId,
        on: githubData.on
    }
    return testCase
}

export const POST = async (request: Request) => {
    const isAuth = verifyToken(request.headers)
    if (isAuth) {
        // verify and reconstruct data
        const data = await request.json()
        const testCase = cleanData(data)
        if (!testCase) return { status: 400, body: { message: 'invalid data' } }

        // save data to mongodb
        const mongo = new Mongo()
        await mongo.connect()

        // is unique case by jobId and parentRunId
        const result = await mongo.findOne('testcases', { jobId: testCase.jobId, runId: testCase.runId })
        if (result.state === 'fail') {
            const res = await mongo.insertOne('testcases', testCase)

            // update reports
            const isReportUpdate = await updateReport(testCase, mongo)
            console.log(isReportUpdate)

            mongo.close()

            return new Response(JSON.stringify({ ...res, errMsg: 'ok' }), {
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                status: 200
            })
        } else {
            // Case already exists
            mongo.close()
            return new Response(JSON.stringify({
                errMsg: 'Case already exists',
                state: 'fail'
            }), {
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                status: 400
            })
        }
    } else {
        // not authorized
        return new Response(JSON.stringify({ errMsg: 'unauthorization !!!' }), {
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            status: 401
        })
    }
}
