import { testStatus } from "../utils/interface.d.ts"
/*
    type status = "operational" | "degraded_performance" | "partial_outage" | "major_outage" 
*/
export default function IncidentItem(opts: { eventTitle: string, eventSubTitle: string, time: number, status: testStatus }) {
    let textColor = ''
    let statusText = ''
    let statusIcon = ''
    const status = opts.status
    const baseClass = 'md-text-5 text-4.3 md-mt-7 mt-7 hover:cursor-default'
    if (status === "operational") {
        textColor = 'text-green-600'
        statusText = 'All Systems Operational'
        statusIcon = 'check_circle'
    } else if (status === "degraded_performance") {
        textColor = 'text-yellow-600'
        statusText = 'Degraded Performance'
        statusIcon = 'report_problem'
    } else if (status === "partial_outage") {
        textColor = 'text-orange-600'
        statusText = 'Partial Outage'
        statusIcon = 'report_problem'
    } else if (status === "major_outage") {
        textColor = 'text-pink-700'
        statusText = 'Oposss!!! Something went wrong...'
        statusIcon = 'highlight_off'
    }

    textColor = baseClass + ' ' + textColor
    return (
        <div className=" border-b-1 border-l-3 border-gray-200  md-h-30 h-28">
            <div className="rounded-full bg-orange-500 w-8 h-8 relative left--4 top-5">
                <span className="material-icons pl-1 pt-1 text-white hover:cursor-default">
                    info
                </span>
            </div>
            <div className="pl-8 mt--10 flex  justify-center flex-col " >
                <div className={textColor}>{opts.eventTitle}</div>
                <p className="md-text-3.5 text-3 mt-1 md-mt-0 hover:cursor-default">{opts.eventSubTitle}</p>
                <p className="mdtext-3.5 text-3 text-gray-500 mt-1 md-mt-0 hover:cursor-default">{new Date(opts.time).toDateString()}</p>
            </div>
        </div>
    )
}