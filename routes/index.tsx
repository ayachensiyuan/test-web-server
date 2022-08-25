import { Link, useData } from "aleph/react";
import StatusCard from "../components/StatusCard.tsx";
import ItemCard from "../components/ItemCard.tsx";
import { reportCardInterface, testStatus } from "../utils/interface.d.ts"

export const data = {
  async get(_: Request, _ctx: Context) {
    const data = await fetch("http://localhost/api/testdata")
    return data
  }
}

export default function Index() {
  const  {data}  = useData<{data: reportCardInterface[], reportResultStatus: testStatus, time: string}>()

  const mainStatusTitle = 'Current Status'
  const itemCards = data.data

  return (
    <div className="dark:bg-gray-800 dark:text-white">
      {/* main */}
      <div className="w-9/10 max-w-350 mx-auto relative md-top--28">
        {/* status card */}
        <StatusCard status={data.reportResultStatus} />
        <h1 className="text-3xl my-8 hover:cursor-default">{mainStatusTitle}</h1>

        {/* item card */}
        <div className="flex md-flex-wrap md-flex-row flex-col shadow-md shadow-gray-200">
          {itemCards.map((item, index) => <ItemCard key={index} title={item.testReportName} status={item.testTotalStatus} failedCasesNumber={item.reportData?.testCaseFailures || 0} reportID={item.reportId} />)}
        </div>

        <hr className="mt-10 text-gray-200 border-1.5" />

        {/* footer */}
        <div className="flex justify-end mb-20 pr-3">
          <Link className="flex no-wrap" to="/history">
            <span className="text-blue-600 mt-7">Incident History </span>
            <span className="border-r-2 text-transparent border-b-2 w-2 h-2 border-blue-600 rotate--45 relative top-9.5 left-2 "></span>
          </Link>
        </div>
      </div>
    </div>
  )
}
