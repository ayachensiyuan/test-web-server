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
  const  {data}  = useData()



  return (
    <div className="dark:bg-gray-800 dark:text-white">
      {/* main */}
      <div>{JSON.stringify(data)}</div>

    </div>
  )
}
