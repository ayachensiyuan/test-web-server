export type testStatus = "operational" | "degraded_performance" | "partial_outage" | "major_outage" | "out_of_data"

export type IncidentItem = {
    eventTitle: string,
    eventSubTitle: string,
    time: number,
    status: testStatus
}