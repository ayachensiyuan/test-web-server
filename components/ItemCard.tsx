import { reportNameEnum, testStatus } from "~/utils/schema.ts"
import { Link } from "aleph/react"
import { useState } from "react"
/*
    type status = "operational" | "degraded_performance" | "partial_outage" | "major_outage" 
*/
export default function ItemCard(opts: { status: testStatus, title: string,  reportID: '01' | '02' | '03' | '04' | '05' | '06', failedCasesNumber: number}) {
    let bgColor = ''
    let statusIcon = ''
    const status = opts.status
    const baseClass = 'material-icons hover:cursor-default'
    if (status === "operational") {
        bgColor = 'text-green-600'
        statusIcon = 'check_circle'
    } else if (status === "degraded_performance") {
        bgColor = 'text-yellow-600'
        statusIcon = 'report_problem'
    } else if (status === "partial_outage") {
        bgColor = 'text-orange-600'
        statusIcon = 'report_problem'
    } else if (status === "major_outage") {
        bgColor = 'text-pink-700'
        statusIcon = 'highlight_off'
    } else {
        bgColor = 'text-gray-600'
        statusIcon = 'help_outline'
    }
    bgColor = baseClass + ' ' + bgColor

    const [hideTips, changeTips] = useState(false)
    const toggleTips = () => {
        changeTips(!hideTips)
    }

    return (
        <div className="bg-white border-gray-300  border-0.5 md-w-1/2 h-23 px-5 flex justify-center flex-col hover:bg-gray-100 dark:bg-gray-800 dark:text-white" >
            <div className="flex justify-between">
                <div className="flex items-center">
                    <Link className={`text-4.5 mr-3 ${status!=='out_of_data'? 'hover:cursor-pointer hover:text-blue hover:underline':'hover:cursor-default'}`} to={status!=='out_of_data'?`/report/${opts.reportID}`:'/'} >{opts.title}</Link>
                    <span className="material-icons text-gray-400 scale-80 hover:text-gray-800 hover:cursor-pointer " onMouseOver={toggleTips} onMouseLeave={toggleTips}>
                        help_outline
                    </span>
                    {/* tips */}
                    <div className={hideTips?"bg-white border-0.5 shadow border-gray-300 flex justify-center items-center whitespace-nowrap w-40 h-5 relative top--6 left--10 text-3 text-center text-gray-500":" hidden bg-white border-0.5 shadow border-gray-300  items-center whitespace-nowrap w-40 h-5 relative top--6 left--10 text-3  text-gray-500"}>{status!=='out_of_data'?`${opts.failedCasesNumber} test cases failed.`:'no data avaliable.'}</div>
                </div>
                <div className="">
                    <span className={bgColor}>
                        {statusIcon}
                    </span>
                </div>
            </div>
        </div>
    )
}