import DatePicker from "../components/DatePicker.tsx"
import IncidentEvent from "../components/IncidentEvent.tsx"
import {Link} from "aleph/react";
export default function Mypage() {
return (
    <div className="w-9/10 max-w-250 mx-auto  ">
        <h1 className="text-3xl md-pb-8 pb-4">Incident History</h1>
        <div className="border-gray-200 border-1.5  bg-white shadow-md shadow-gray-200 ">
            <DatePicker />

            <div>
                <IncidentEvent />
                <IncidentEvent />
                <IncidentEvent />
            </div>
            
        </div>
        <div className="flex justify-end mb-20">
          <Link to="/">
            <p className="text-blue-600 mt-7">Current Status ></p>
          </Link>
        </div>


  </div>
)

}