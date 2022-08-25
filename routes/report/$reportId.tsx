import { Link, useData } from "aleph/react"
import { changeStatusIcon } from "../../utils/tools.ts"
import { reportCardInterface, testCaseInterface } from "../../utils/interface.d.ts"
import { useState } from "react"
export const data = {
    async get(_req: Request, ctx: Context) {
        const data = await fetch(`http://localhost/api/todayreport?reportId=${ctx.params.reportId}`)
        return data
    }
}
//     statusIcon = 'check_circle'
//     statusIcon = 'report_problem'
//     statusIcon = 'highlight_off'
export default function report() {
    const reportTitle = 'Incident Report'
    const { data: report } = useData<reportCardInterface>()
    const testCasesState = changeStatusIcon(report.reportData?.testCases) || []
    const [testCases, changeCase] = useState(testCasesState)

    return (
        <div className="w-9/10 max-w-350 mx-auto cursor-default">
            <h1 className="text-3xl md-pb-8 pb-4 ">{reportTitle}</h1>
            <h2 className="mb-5 text-lg text-gray-500">{new Date(Date.now()).toDateString()}</h2>
            <div className="border-gray-200 border-1.5   bg-white shadow-md shadow-gray-200 ">
                <div className="">
                    <table className="table-auto w-full border-collapse border-1 border-gray-300 ">
                        <thead className="text-center  text-gray-600 text-sm">
                            <tr className="h-10">
                                <th>
                                    status
                                </th>
                                <th >report name</th>
                                <th >author</th>
                                <th >duration</th>
                                <th >target type</th>
                                <th >core version</th>
                                <th >method({">"} 20ms)</th>
                                <th >OS</th>
                                <th >node version</th>
                            </tr>
                        </thead>
                        <tbody className="text-center border-gray-300 text-sm">
                            {/* testcases */}
                            {testCases.map((item: testCaseInterface, index: number) => {
                                return (
                                    <tr className="h-10   hover:bg-gray-100 border-0.5 border-gray-200" key={item.caseId}>
                                        <td>              <span className="material-icons" style={{ "color": item.statusIconColor }}>
                                            {item.statusIcon}
                                        </span></td>
                                        <td >
                                            <Link className="hover:link cursor-pointer" to={item.caseURL || '/'}>
                                                {item.caseName}
                                            </Link>
                                        </td>
                                        <td className="hover:link cursor-pointer">
                                            <a href={`mailto:${item.author}`}>
                                                {item.author}
                                            </a>
                                        </td>
                                        <td>{item.caseDuration}</td>
                                        <td>{item.targetType}</td>
                                        <td>{item.coreVersion}</td>
                                        <td>method({">"} 20ms)</td>
                                        <td>{item.os}</td>
                                        <td>{item.nodeVersion}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {testCases.length == 0 ? <div className="text-center my-5 text-5">out of data</div> : null}
                </div>
            </div>
            <div className="flex justify-end mb-20 pr-3">
                <Link className="flex no-wrap " to="/">
                    <span className="text-blue-600 mt-7">back </span>
                    <span className="border-r-2 text-transparent border-b-2 w-2 h-2 border-blue-600 rotate--45 relative top-9.5 left-2 "></span>
                </Link>
            </div>
        </div>
    )
}