export default function IncidentItem() {
    return (
        <div className=" border-b-1 border-l-3 border-gray-200  md-h-30 h-28">
            <div className="rounded-full bg-gray-200 w-8 h-8 relative left--4 top-5">
                <img src="https://github.githubassets.com/favicons/favicon.svg" className="w-4 h-4 relative left-2 top-2" />
            </div>
            <div className="pl-8 mt--10 flex  justify-center flex-col " >
                <div className="md-text-5 text-4.3 md-mt-7 mt-7 text-yellow-500">Incident with Codespaces</div>
                <p className="md-text-3.5 text-3 mt-1 md-mt-0">This incident has been resolved.</p>
                <p className="mdtext-3.5 text-3 text-gray-500 mt-1 md-mt-0">Aug 21, 17:07 - 19:18 UTC</p>
            </div>
        </div>
    )
}