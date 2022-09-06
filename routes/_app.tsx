import Header from "~/components/Header.tsx";
import MyBanner from "~/components/MyBanner.tsx";
import Loading from "~/components/Loading.tsx"
import { useData, forwardProps } from "aleph/react";
import { useEffect, useState } from 'react'
import { ReportSchema } from "~/utils/schema.ts";


export const data = {
  async get(_: Request, _ctx: Context) {
    const data = await fetch("http://localhost/api/report")
    return data
  }
}

export default function App({ children }: { children: React.ReactNode }) {
  const { data } = useData<{errMsg: string, reportList:ReportSchema[] }>()
  const [isLoading, changeLoading] = useState(true)
  useEffect(() => {
    if (data.errMsg === "ok") {
      // localStorage.setItem('rawData', JSON.stringify(data))
      changeLoading(false)
    }
  }, [])

  return (
    <>
      <Header />
      <Loading isLoading={isLoading} />
      <MyBanner />
      <div className="dark:bg-gray-800 dark:text-white">
        {forwardProps(children, { data })}
      </div>
    </>
  );
}
