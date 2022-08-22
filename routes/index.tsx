import {Link} from "aleph/react";
import StatusCard from "../components/StatusCard.tsx";
import ItemCard from "../components/ItemCard.tsx";


export default function Index() {
  return (
    <div >
      {/* main */}
      <div className="w-9/10 max-w-245 mx-auto relative md-top--28">
        {/* status card */}
        <StatusCard />
        <h1 className="text-3xl my-8">Current status</h1>

        {/* item card */}
        <div className="flex md-flex-wrap md-flex-row flex-col shadow-md shadow-gray-200">
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />

        </div>

        <hr className="mt-10 text-gray-200 border-1.5" />

        <div className="flex justify-end">
          <Link to="/history">
            <p className="text-blue-600 mt-7">Incident History ></p>
          </Link>
        </div>

      </div>

    </div>

  );
}
