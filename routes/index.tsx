import {Link} from "aleph/react";
import StatusCard from "../components/StatusCard.tsx";
import ItemCard from "../components/ItemCard.tsx";
import { testStatus } from "../utils/interface.d.ts"

export default function Index() {

  const mainStatusTitle = 'Current Status'


  return (
    <div >
      {/* main */}
      <div className="w-9/10 max-w-245 mx-auto relative md-top--28">
        {/* status card */}
        <StatusCard status="operational"/>
        <h1 className="text-3xl my-8 hover:cursor-default">{mainStatusTitle}</h1>

        {/* item card */}
        <div className="flex md-flex-wrap md-flex-row flex-col shadow-md shadow-gray-200">
          <ItemCard title="CLI e2e test" status="operational"/>
          <ItemCard title="vsc UI test" status="partial_outage"/>
          <ItemCard title="performance test" status="operational"/>
          <ItemCard title="vs UI test" status="degraded_performance"/>
          <ItemCard title="sdk e2e test" status="major_outage"/>
          <ItemCard title="CI/CD e2e test" status="major_outage"/>
        </div>

        <hr className="mt-10 text-gray-200 border-1.5" />

        <div className="flex justify-end">
          <Link className="flex no-wrap " to="/history">
            <span className="text-blue-600 mt-7">Incident History </span>
            <span className="border-r-2 text-transparent border-b-2 w-2 h-2 border-blue-600 rotate--45 relative top-9.5 left-2 "></span>
          </Link>
        </div>

      </div>

    </div>

  );
}
