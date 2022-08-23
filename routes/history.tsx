import DatePicker from "../components/DatePicker.tsx"
import IncidentEvent from "../components/IncidentEvent.tsx"
import { IncidentItem } from "../utils/interface.d.ts"
import {Link} from "aleph/react";
export default function Mypage() {
  const historyPageTitle = 'Incident History'
  const time = Date.now()

  console.log('history')

  const fakeList1: IncidentItem = [
    {eventTitle: 'title1', eventSubTitle: 'subtitle1', time, status: 'operational'},
    {eventTitle: 'title2', eventSubTitle: 'subtitle2', time, status: 'partial_outage'},
    {eventTitle: 'title3', eventSubTitle: 'subtitle3', time, status: 'degraded_performance'},
    {eventTitle: 'title4', eventSubTitle: 'subtitle4', time, status: 'operational'},
    {eventTitle: 'title5', eventSubTitle: 'subtitle5', time, status: 'operational'},
    {eventTitle: 'title6', eventSubTitle: 'subtitle6', time, status: 'major_outage'},
    {eventTitle: 'title7', eventSubTitle: 'subtitle7', time, status: 'operational'},
]
const fakeList2: IncidentItem = [
  {eventTitle: 'title1', eventSubTitle: 'subtitle1', time, status: 'operational'},
  {eventTitle: 'title2', eventSubTitle: 'subtitle2', time, status: 'partial_outage'},
  {eventTitle: 'title3', eventSubTitle: 'subtitle3', time, status: 'degraded_performance'},
  {eventTitle: 'title4', eventSubTitle: 'subtitle4', time, status: 'operational'},
  {eventTitle: 'title5', eventSubTitle: 'subtitle5', time, status: 'operational'}
]
const fakeList3: IncidentItem = [
  {eventTitle: 'title1', eventSubTitle: 'subtitle1', time, status: 'operational'},
  {eventTitle: 'title2', eventSubTitle: 'subtitle2', time, status: 'partial_outage'},
  {eventTitle: 'title3', eventSubTitle: 'subtitle3', time, status: 'degraded_performance'},
  {eventTitle: 'title4', eventSubTitle: 'subtitle4', time, status: 'operational'},
  {eventTitle: 'title5', eventSubTitle: 'subtitle5', time, status: 'operational'},
  {eventTitle: 'title6', eventSubTitle: 'subtitle6', time, status: 'major_outage'},
  {eventTitle: 'title7', eventSubTitle: 'subtitle7', time, status: 'degraded_performance'},
  {eventTitle: 'title8', eventSubTitle: 'subtitle8', time, status: 'degraded_performance'},
  {eventTitle: 'title9', eventSubTitle: 'subtitle9', time, status: 'operational'}
]

return (
    <div className="w-9/10 max-w-250 mx-auto  ">
        <h1 className="text-3xl md-pb-8 pb-4 hover:cursor-default">{historyPageTitle}</h1>
        <div className="border-gray-200 border-1.5  bg-white shadow-md shadow-gray-200 ">
            <DatePicker timeList={[{month:'Aug', year: 2022},{month:'Jul', year: 2022},{month:'Jun', year: 2022},{month:'May', year: 2022},]}/>
            <div>
                <IncidentEvent month="Auguest 2022" eventList={fakeList1}/>
                <IncidentEvent month="July 2022" eventList={fakeList2}/>
                <IncidentEvent month="June 2022" eventList={fakeList3}/>
            </div>
            
        </div>
        <div className="flex justify-end mb-20 pr-3">
          <Link className="flex no-wrap " to="/">
            <span className="text-blue-600 mt-7">Current Status </span>
            <span className="border-r-2 text-transparent border-b-2 w-2 h-2 border-blue-600 rotate--45 relative top-9.5 left-2 "></span>
          </Link>
        </div>


  </div>
)

}