import { Link } from "aleph/react"




//     statusIcon = 'check_circle'
//     statusIcon = 'report_problem'
//     statusIcon = 'highlight_off'
export default function report(props) {
    const reportTitle = 'Incident Report'

    console.log(props)




    return (
        <div className="w-9/10 max-w-250 mx-auto cursor-default">
            <h1 className="text-3xl md-pb-8 pb-4 ">{reportTitle}</h1>
            <h2 className="mb-5 text-lg text-gray-500">28 Auguest 2022</h2>
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
                                <th >method(> 20ms)</th>
                                <th >OS</th>
                                <th >node version</th>
                            </tr>
                        </thead>
                        <tbody className="text-center border-gray-300 text-sm">
                            <tr className="h-10   hover:bg-gray-100 border-0.5 border-gray-200">
                                <td>              <span className="material-icons error">
                                    highlight_off
                                </span></td>
                                <td className="hover:link cursor-pointer">report name</td>
                                <td className="hover:link cursor-pointer">author</td>
                                <td className="">duration</td>
                                <td className="">target type</td>
                                <td className="">core version</td>
                                <td className="">method(> 20ms)</td>
                                <td className="">OS</td>
                                <td className="">node version</td>

                            </tr>
                            <tr className="h-10  ">
                                <td>              <span className="material-icons danger">
                                report_problem
                                </span></td>
                                <td className="">report name</td>
                                <td className="">author</td>
                                <td className="">duration</td>
                                <td className="">target type</td>
                                <td className="">core version</td>
                                <td className="">method(> 20ms)</td>
                                <td className="">OS</td>
                                <td className="">node version</td>

                            </tr>
                            <tr className="h-10  ">
                                <td>              <span className="material-icons warning">
                                report_problem
                                </span></td>
                                <td className="">report name</td>
                                <td className="">author</td>
                                <td className="">duration</td>
                                <td className="">target type</td>
                                <td className="">core version</td>
                                <td className="">method(> 20ms)</td>
                                <td className="">OS</td>
                                <td className="">node version</td>

                            </tr>
                            <tr className="h-10  ">
                                <td>              <span className="material-icons success">
                                check_circle
                                </span></td>
                                <td className="">report name</td>
                                <td className="">author</td>
                                <td className="">duration</td>
                                <td className="">target type</td>
                                <td className="">core version</td>
                                <td className="">method(> 20ms)</td>
                                <td className="">OS</td>
                                <td className="">node version</td>

                            </tr>
                            <tr className="h-10  ">
                                <td>              <span className="material-icons success">
                                check_circle
                                </span></td>
                                <td className="">report name</td>
                                <td className="">author</td>
                                <td className="">duration</td>
                                <td className="">target type</td>
                                <td className="">core version</td>
                                <td className="">method(> 20ms)</td>
                                <td className="">OS</td>
                                <td className="">node version</td>

                            </tr>
                            <tr className="h-10  ">
                                <td>              <span className="material-icons success">
                                check_circle
                                </span></td>
                                <td className="">report name</td>
                                <td className="">author</td>
                                <td className="">duration</td>
                                <td className="">target type</td>
                                <td className="">core version</td>
                                <td className="">method(> 20ms)</td>
                                <td className="">OS</td>
                                <td className="">node version</td>

                            </tr>



                        </tbody>
                    </table>
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