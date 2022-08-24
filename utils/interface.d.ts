export type testStatus = "operational" | "degraded_performance" | "partial_outage" | "major_outage" | "out_of_data"

export type eventListInterface = {
    eventTitle: string,
    eventSubTitle: string,
    eventTime: number,
    status: testStatus
}

export type reportCardInterface = {
    title: string,
    status: testStatus,
    reportID: number
}