import IncidentItem from "./IncidentItem.tsx"
export default function IncidentEvent() {
    return (
        <div className="md-px-10 px-7" style={{ "font-weight": "400" }}>
            <h2 className="text-7">August 2022</h2>
            <hr className="mt-2 text-gray-200 border-0.5" />
            <div className="px-5">
                <IncidentItem />
                <IncidentItem />
                <IncidentItem />
            </div>
            <div className="border-0.5 md-h-10 h-8 text-gray-400 flex justify-center items-center mb-6 relative top--0.3 bg-white">
                <p className="text-gray-500 text-3.5 md-text-4">+ Show All 7 Incidents</p>
            </div>

        </div>
    )
}