import DatePicker from "../components/DatePicker.tsx"
import IncidentEvent from "../components/IncidentEvent.tsx"
import {Link} from "aleph/react";
export default function Mypage() {
  const historyPageTitle = 'Incident History'
return (
    <div className="w-9/10 max-w-250 mx-auto  ">
        <h1 className="text-3xl md-pb-8 pb-4">{historyPageTitle}</h1>
        <div className="border-gray-200 border-1.5  bg-white shadow-md shadow-gray-200 ">
            <DatePicker timeList={[{month:'Aug', year: 2022},{month:'Jul', year: 2022},{month:'Jun', year: 2022},{month:'May', year: 2022},]}/>
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