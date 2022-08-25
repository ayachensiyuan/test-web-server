export type testStatus = "operational" | "degraded_performance" | "partial_outage" | "major_outage" | "out_of_data"

export type eventListInterface = {
    eventTitle: string,
    eventSubTitle: string,
    eventTime: number,
    status: testStatus
}
export type testCaseInterface = {
    author: string,
    caseName: string,
    caseStatus: "passed" | "failed" | "skip",
    caseDuration: number,
    caseId: number,
    caseDescription?: string,
    targetType: string,
    nodeVersion: "14" | "16",
    os: "Linux" | "Windows" | "MacOS",
    coreVersion: "V1/V2" | "V3",
    caseLog?: string,
    caseStartTime?: number,
    caseEndTime?: number,
    statusIcon?: "check_circle" | "report_problem" | "highlight_off",
    statusIconColor?: "green" | "red" | "yellow"
}

export type reportDataInterface = {
    testCaseFailures: number,
    testCases: testCaseInterface[],
    testDate: string,
    testDuration: number,
    testTotalStatus: testStatus
}

export type reportCardInterface = {
    testReportName: string,
    testTotalStatus: testStatus,
    reportId: number,
    reportStatus: "GET" | "OUT_OF_DATA",
    reportData?: reportDataInterface
}
