import { Link, NavLink } from "aleph/react";

export default function Header() {
  return (
    <header className="bg-white md-h-19 h-38 flex justify-center px-10 shadow-lg shadow-gray-300 w-screen dark:bg-gray-800 dark:text-white">
      <div className=" w-full flex justify-between items-center flex-wrap ">
        <nav className="w-full md-w-auto">
          <ul className="flex items-center  justify-center ">
            <li className="mr-4">
              <NavLink activeClassName="text-blue" to="/">
                <div  className=" text-2xl font-bold hover-text-blue">HomePage</div>
              </NavLink>

            </li>
            <li className="mr-4">
              <NavLink activeClassName="text-blue" to="/history">
                <div className=" text-2xl font-bold hover-text-blue">History</div>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className=" ">
          <Link to="https://github.com/officedev/teamsfx">
            <img src="https://github.githubassets.com/favicons/favicon.svg" className="w-10 h-10" />
          </Link>

        </div>
        <nav className="w-full md-w-auto">
          <ul className="flex items-center  justify-center ">
            <li className="mr-4">
              <Link to="https://app.codecov.io/gh/OfficeDev/TeamsFx">
                <img src="https://app.codecov.io/favicon.ico" className="w-10 h-10" />
              </Link>
            </li>
            <li className="mr-4">
              <NavLink activeClassName="text-blue" to="https://github.com/officedev/teamsfx">
                <div className=" text-xl font-bold">Microsoft Teams Toolkit</div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
