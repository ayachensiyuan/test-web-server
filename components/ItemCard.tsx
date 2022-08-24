import { testStatus } from "../utils/interface.d.ts"
import { Link } from "aleph/react"


/*
    type status = "operational" | "degraded_performance" | "partial_outage" | "major_outage" 
*/
export default function ItemCard(opts: { status: testStatus, title: string,  reportID: number }) {
    
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
    }
    bgColor = baseClass + ' ' + bgColor

    // const [hideTips, changeTips] = useState(false)

    // const toggleTips = () => {
    //     changeTips(!hideTips)
    // }
    const jumpTo = () => {
        Link({
            to: `/report/${opts.reportID}`
        })
    }





    return (
        <div className="bg-white border-gray-300  border-0.5 md-w-1/2 h-23 px-5 flex justify-center flex-col" >
            <div className="flex justify-between">
                <div className="flex items-center">

                    <Link className="text-4.5 mr-3 hover:cursor-pointer hover:text-blue hover:underline " to={'/report?id='+ opts.reportID} >{opts.title}</Link>
                    {/* <span className="material-icons text-gray-400 scale-80 hover:text-gray-800 hover:cursor-pointer " onMouseOver={toggleTips} onMouseLeave={toggleTips}>
                        help_outline
                    </span>
           
                    <div className={hideTips?"display-none bg-white border-0.5 shadow border-gray-300 flex items-center whitespace-nowrap w-40 h-5 relative top--8 left--10 text-3 justify-center text-gray-500  before:border-l-1 before:content-[123] before:text-transparent before:border-b-1 before:w-4 before:h-4 before:relative before:top-2.5 before:left--1  before:rotate--45 before:border-gray-300 before:bg-white ":"display-none bg-white border-0.5 shadow border-gray-300 flex items-center whitespace-nowrap w-40 h-5 relative top--8 left--10 text-3 justify-center text-gray-500  before:border-l-1 before:content-[123] before:text-transparent before:border-b-1 before:w-4 before:h-4 before:relative before:top-2.5 before:left--1  before:rotate--45 before:border-gray-300 before:bg-white "}>
                        3 test case failed
                    </div> */}

                </div>
                <div className="">
                    <span className={bgColor}>
                        {statusIcon}
                    </span>

                </div>
            </div>

        </div>
    );

}