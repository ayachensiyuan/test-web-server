export type testStatus = "operational" | "degraded_performance" | "partial_outage" | "major_outage"

export type IncidentItem = {
    eventTitle: string,
    eventSubTitle: string,
    time: number,
    status: testStatus
}