import { Link, useData, useRouter } from "aleph/react"
import { changeStatusIcon } from "~/utils/tools.ts"
import { useState, useEffect } from "react"
import { ReportSchema, testStatus, CaseSchema } from "~/utils/schema.ts"

export const data = {
  get(_req: Request, ctx: Context) {
    const data = localStorage.getItem(ctx.params.reportId)
    if(data){
      const jsonData:ReportSchema = JSON.parse(data)
      if (jsonData.reportResultStatus !== testStatus.out_of_data) {
        return {
          data: jsonData,
          errMsg: 'ok'
        }
      } else {
        return { errMsg: 'out_of_data' }
      }
    } else {
      return { errMsg: 'out_of_data' }
    }
  }
}
//     statusIcon = 'check_circle'
//     statusIcon = 'report_problem'
//     statusIcon = 'highlight_off'
export default function report() {
  const reportTitle = 'Incident Report'
  const { data } = useData<{errMsg: string, data: ReportSchema}>()
  const [reportCases, changeCases] = useState<CaseSchema[]>([])
  useEffect(()=>{
    if(data.errMsg === 'out_of_data') {
      useRouter().redirect('/')
    } else {
      changeCases(changeStatusIcon(data.data.reportCases))
    }
  }, []) 
  
  return (
    <div className="w-9/10 max-w-350 mx-auto cursor-default">
      <h1 className="text-3xl md-pb-8 py-4">{reportTitle}</h1>
      <h2 className="mb-5 text-lg text-gray-500">{new Date(Date.now()).toDateString()}</h2>
      <div className="border-gray-200 border-1.5   bg-white shadow-md shadow-gray-200 ">
        <div className="">
          <table className="table-auto w-full border-collapse border-1 border-gray-300 ">
            <thead className="text-center  text-gray-600 text-sm">
              <tr className="h-10">
                <th>No.</th>
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
                <th>on</th>
              </tr>
            </thead>
            <tbody className="text-center border-gray-300 text-sm">
              {/* testcases */}
              {reportCases.map((item, index) => {
                if(item.github && item._id)
                return (
                  <tr className="h-10   hover:bg-gray-100 border-0.5 border-gray-200" key={item._id.toString()}>
                    <td>{index + 1}</td>
                    <td>              <span className="material-icons" style={{ "color": item.statusIconColor }}>
                      {item.statusIcon}
                    </span></td>
                    <td >
                      <Link className="hover:link cursor-pointer" to={item.github.caseURL || '/'}>
                        {item.basic.title}
                      </Link>
                    </td>
                    <td className="hover:link cursor-pointer">
                      <a href={item.basic.author?.includes('@microsoft.com')?`mailto:${item.basic.author}`:`javascript:void()`}>
                        {item.basic.author}
                      </a>
                    </td>
                    <td>{item.github.duration}</td>
                    <td>{item.github.targetType}</td>
                    <td>{item.github.coreVersion}</td>
                    <td>{item.github.slowMethod}</td>
                    <td>{item.github.os}</td>
                    <td>{item.github.nodeVersion}</td>
                    <td>{item.github.on}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {reportCases.length == 0 ? <div className="text-center my-5 text-5">out of data</div> : null}
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