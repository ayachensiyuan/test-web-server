import { testStatus } from "../utils/interface.d.ts"

import IncidentItem from "./IncidentItem.tsx"
export default function IncidentEvent(opts: {eventList: {eventTitle:string, eventSubTitle: string, time: number, status: testStatus }[], month: string}) {
    const eventList = opts.eventList

    
    const toggle = () => {
        return 
    }
    
    return (
        <div className="md-px-10 px-7 font-400">
            <h2 className="text-7 hover:cursor-default">{opts.month}</h2>
            <hr className="mt-2 text-gray-200 border-0.5" />
            <div className="px-5">
                <IncidentItem status={opts.eventList[0].status} eventTitle={opts.eventList[0].eventTitle} eventSubTitle={opts.eventList[0].eventSubTitle} time={opts.eventList[0].time}/>
                <IncidentItem status={opts.eventList[1].status} eventTitle={opts.eventList[1].eventTitle} eventSubTitle={opts.eventList[1].eventSubTitle} time={opts.eventList[1].time}/>
                <IncidentItem status={opts.eventList[2].status} eventTitle={opts.eventList[2].eventTitle} eventSubTitle={opts.eventList[2].eventSubTitle} time={opts.eventList[2].time}/>
            </div>
            <div className="border-0.5 border-gray-200 md-h-10 h-8 text-gray-400 flex justify-center items-center mb-6 relative top--0.3 bg-white text-gray-500 hover:bg-gray-50 hover:cursor-pointer shadow hover:border-gray-300 active:pl-1 active:pt-1 active:relative">
                <p className="text-3.5 md-text-4  ">{false?'+ Show All '+ eventList.length + ' Incidents':'- collapse Incidents'}</p>
            </div>

        </div>
    )
}