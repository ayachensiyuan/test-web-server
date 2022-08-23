import { eventListInterface } from "../utils/interface.d.ts"
import { useState } from "react"

import IncidentItem from "./IncidentItem.tsx"

export default function IncidentEvent(opts: {eventList: eventListInterface[], month: string}) {
    
    const eventList:eventListInterface[] = opts.eventList
    const [isShown, toggleShow] = useState(false)
    const toggleShowHandler = () => {
        toggleShow(!isShown)
    }
    
    return (
        <div className="md-px-10 px-7 font-400">
            <h2 className="text-7 hover:cursor-default">{opts.month}</h2>
            <hr className="mt-2 text-gray-200 border-0.5" />
            <div className="px-5">
                {eventList.map((event) => <IncidentItem eventTitle={event.eventTitle} eventSubTitle={event.eventSubTitle} eventTime={event.eventTime} status={event.status} />)}
 
            </div>
            <div onClick={toggleShowHandler} className="border-0.5 border-gray-200 md-h-10 h-8 text-gray-400 flex justify-center items-center mb-6 relative top--0.3 bg-white text-gray-500 hover:bg-gray-50 hover:cursor-pointer shadow hover:border-gray-300 active:pl-1 active:pt-1 active:relative">
                <p className="text-3.5 md-text-4  ">{isShown?'+ Show All '+ opts.eventList.length + ' Incidents':'- collapse Incidents'}</p>
            </div>

        </div>
    )
}