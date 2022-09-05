import { ReportSchema, testStatus, reportNameEnum, CaseSchema } from "~/utils/schema.ts";
import { config } from 'dotenv'
//     statusIcon = 'check_circle'
//     statusIcon = 'report_problem'
//     statusIcon = 'highlight_off'
export const changeStatusIcon = (caseItems: CaseSchema[]) => {
  if (caseItems.length != 0) {
    for (let i = 0; i < caseItems.length; i++) {
      if (caseItems[i].status === testStatus.operational) {
        caseItems[i].statusIcon = 'check_circle'
        caseItems[i].statusIconColor = 'green'
      } else if (caseItems[i].status === testStatus.panic) {
        caseItems[i].statusIcon = 'highlight_off'
        caseItems[i].statusIconColor = 'red'
      } else {
        caseItems[i].statusIcon = 'report_problem'
        caseItems[i].statusIconColor = 'orange'
      }
    }
    return caseItems
  }
  return []
}

export const getEnv = (key: string) => {
  if (Deno.env.get(key)) {
    return Deno.env.get(key) as string
  } else {
    config({
      path: './test-web-server/.env',
      export: true
    })
    return Deno.env.get(key) as string
  }
}

export const verifyToken = (headers: Headers) => {
  const token = headers.get('authorization')?.split(' ')[1]
  if (token === getEnv("ACCESS_TOKEN")) {
    return true
  } else {
    return false
  }
}

/*
testStatus = "operational" | "degraded_performance" | "partial_outage" | "major_outage" | "out_of_data"
failures: 
0% => 'operational' = 0
<20% => "degraded_performance" = 1
<=50% => "partial_outage" = 2
>50% => "major_outage" = 3
mochawesome.results[0].suites[0].failures.length/
mochawesome.results[0].suites[0].tests.length * 100 %
0 1 2 3 
*/

export const getReportStatus = (reportList: ReportSchema[]) => {
  let totalStatus = 0
  for (let j = 0; j < reportList.length; j++) {
    let status = 0
    let testCaseFailures = 0
    for (let i = 0; i < reportList[j].reportCases.length; i++) {
      const mochawesome = reportList[j].reportCases[i].mochawesome
      const failures = mochawesome?.results[0].suites[0].failures.length || 0
      const totalTest = mochawesome?.results[0].suites[0].tests.length || 0
      const percentage = failures / totalTest * 100
      testCaseFailures += failures
      if (percentage === 0) {
        reportList[j].reportCases[i].status = testStatus.operational
        status += 0
      } else if (percentage <= 20) {
        reportList[j].reportCases[i].status = testStatus.partial_failed
        status += 1
      } else if (percentage <= 50) {
        reportList[j].reportCases[i].status = testStatus.partial_passed
        status += 2
      } else {
        reportList[j].reportCases[i].status = testStatus.panic
        status += 3
      }
      reportList[j].reportCases[i].testCaseFailures = failures
    }
    status = Math.ceil(status / reportList[j].reportCases.length)
    reportList[j].reportResultStatus = !status ? testStatus.operational : status === 1 ? testStatus.partial_failed : status === 2 ? testStatus.partial_passed : testStatus.panic
    totalStatus += status
    reportList[j].testCaseFailures = testCaseFailures
  }
  totalStatus = Math.ceil(totalStatus / reportList.length)


  return {
    totalStatus: !totalStatus ? testStatus.operational : totalStatus === 1 ? testStatus.partial_failed : totalStatus === 2 ? testStatus.partial_passed : testStatus.panic as testStatus,
    reportList
  }
}

export const getToday = () => {
  const date = new Date()
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const todayDate = `${year}-${month}-${day}`
  return todayDate
}

export const initItemCards = (reportList: ReportSchema[]) => {
  const itemCards: { [key: string]: any }[] = [{}, {}, {}, {}, {}, {}]
  for (let i = 0; i < reportList.length; i++) {
    switch (reportList[i].reportId) {
      case '01':
        itemCards[0] = reportList[i]
        break;
      case '02':
        itemCards[1] = reportList[i]
        break;
      case '03':
        itemCards[2] = reportList[i]
        break;
      case '04':
        itemCards[3] = reportList[i]
        break;
      case '05':
        itemCards[4] = reportList[i]
        break;
      case '06':
        itemCards[5] = reportList[i]
        break;
    }
  }
  for (let i = 0; i < itemCards.length; i++) {
    if (!itemCards[i].reportId) {
      itemCards[i].reportId = '0' + (i + 1)
      itemCards[i].reportResultStatus = 'out_of_data'
      itemCards[i].reportName = reportNameEnum[itemCards[i].reportId as keyof typeof reportNameEnum]
      itemCards[i].failedCasesNumber = 0
    }
  }
  return itemCards
}

export const updateRuntime = (testCase: CaseSchema) => {

  const filename = testCase.mochawesome?.results[0].suites[0].file
  if(testCase.github){
    // update coreVersion: find the 'v3' in the filename
    filename?.includes('v3')? testCase.github.coreVersion = 'V3' : testCase.github.coreVersion = 'V1/V2'
    // update targetType: find 'ts/js' in the filename
    filename?.includes('ts')? testCase.github.targetType = 'TS' : filename?.includes('js')? testCase.github.targetType = 'JS': '.NET'
  }

  return testCase.github
}