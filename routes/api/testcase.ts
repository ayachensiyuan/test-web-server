import Mongo from '~/utils/mongodb.ts'
import { verifyToken, getToday, updateRuntime, parseAuthor, computeTime } from '~/utils/tools.ts'
import { CaseSchema, reportNameEnum} from '~/utils/schema.ts'

// const updateReport = async (testCase: CaseSchema, db: Mongo) => {
//   const result = await db.findOne('reports', { runId: testCase.github.runId })
//   try {
//     if (result.state === 'fail') {
//       // new report
//       console.log('new report...')
//       const report: ReportSchema = {
//         runId: testCase.runId,
//         on: testCase.on,
//         passes: testCase.state === 'pass' ? 1 : 0,
//         failures: testCase.state === 'fail' ? 1 : 0,
//         pending: testCase.state === 'pending' ? 1 : 0,
//         cases: [testCase],
//         reportName: reportNameEnum[testCase.reportId],
//         reportState: 'GET',
//         reportId: testCase.reportId,
//         duration: testCase.duration,
//         reportDate: [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('-'),
//         reportStartTime: testCase.start,
//         reportEndTime: testCase.end,
//         casesCount: 1
//       }
//       const res = await db.insertOne('reports', report)
//       console.log(res)
//       return true
//     } else {
//       // update report
//       console.log('update report...')
//       const report = result.data as ReportSchema
//       report.passes = testCase.state === 'pass' ? ++report.passes : report.passes
//       report.failures = testCase.state === 'fail' ? ++report.failures : report.failures
//       report.pending = testCase.state === 'pending' ? ++report.pending : report.pending
//       report.cases.push(testCase)
//       report.casesCount = ++report.casesCount
//       report.reportEndTime = testCase.end
//       report.duration = report.reportEndTime.getTime() - report.reportStartTime.getTime()

//       await db.updateOne('reports', { runId: testCase.runId }, report)
//       return true
//     }
//   } catch (error) {
//     return { state: false, error }
//   }
// }


export const POST = async (request: Request) => {
  const isAuth = verifyToken(request.headers)
  if (isAuth) {
    // verify and reconstruct data
    const data: CaseSchema = await request.json()
    const { git, basic, mochawesome, github, azure, azureTestResult } = data

    if (!git || !basic) {
      return new Response(JSON.stringify({
        state: 'fail',
        error: 'invilid data'
      }), {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        status: 302
      })
    }

    // format basic 
    if (!basic.reportId) {
      return new Response(JSON.stringify({
        state: 'fail',
        error: 'invilid data'
      }), {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        status: 302
      })
    }

    // format basic
    basic.uploadTime = new Date()
    basic.author = parseAuthor(mochawesome?.results[0].suites[0].tests[0].context) || git.author || 'unknown'
    basic.reportName = reportNameEnum[basic.reportId]

    // format git 
    const project = JSON.parse(await Deno.readTextFile("./test-web-server/config.json"))
    git.orginazation = git.orginazation || project.ORGINAZATION
    git.repository = git.repository || project.REPOSITORY
    git.branch = git.branch || 'unknown'
    git.commit = git.commit || 'unknown'
    git.date = git.date || new Date()
    git.author = git.author || 'unknown'
    const testCase: CaseSchema = {
      basic,
      git,
      github,
      mochawesome,
      azure,
      azureTestResult
    }
    // get today
    testCase.basic.date = getToday()

    // conect to db    
    const mongo = new Mongo()
    await mongo.connect()

    if (basic.reportId === '01' || basic.reportId === '02' || basic.reportId === '05') {
      if (mochawesome && github) {
        // update title
        testCase.basic.title = mochawesome.results[0].suites[0].file
        // culculate duration
        if (mochawesome.stats && testCase.github) {
          testCase.github.duration = computeTime(mochawesome?.stats?.duration)
        }

        // anlysis mochawesome data
        testCase.github = updateRuntime(testCase)

        if (github.jobId && github.runId) {
          // save data to mongodb

          // is unique case by jobId and parentRunId
          const res = await mongo.findOne(basic.reportName.split(' ').join('_'), { 'github.jobId': github.jobId, 'github.runId': github.runId })

          if (res.state === 'fail') {
            const res = await mongo.insertOne(basic.reportName.split(' ').join('_'), testCase)

            // update reports
            // await updateReport(testCase, mongo)
            mongo.close()
            return res
          } else {
            // Case already exists
            mongo.close()
            return new Response(JSON.stringify({
              state: 'fail',
              error: 'Case already exists.'
            }), {
              headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              status: 200
            })
          }
        } else return new Response(JSON.stringify({
          state: 'fail',
          error: 'invilid data'
        }), {
          headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          status: 302
        })
      } else return new Response(JSON.stringify({
        state: 'fail',
        error: 'invilid data'
      }), {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        status: 302
      })
    } else if (basic.reportId === '04') {
      if (testCase.azure && azureTestResult) {
        testCase.azure.duration = computeTime(azureTestResult.durationInMs)
        // is unique case by jobId and parentRunId
        const res = await mongo.findOne(basic.reportName.split(' ').join('_'), { 'azureTestResult.testRun.id': azureTestResult.testRun.id })
        if (res.state === 'fail') {
          const res = await mongo.insertOne(basic.reportName.split(' ').join('_'), testCase)
          
          mongo.close()
          return res
        } else {
          // Case already exists
          mongo.close()
          return new Response(JSON.stringify({
            state: 'fail',
            error: 'Case already exists.'
          }), {
            headers: {
              'content-type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            status: 200
          })
        }


      } else return new Response(JSON.stringify({
        state: 'fail',
        error: 'invilid data'
      }), {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        status: 302
      })
    }

    return new Response(JSON.stringify({
      state: 'fail',
      error: 'unhandle branch'
    }), {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      status: 500
    })
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
