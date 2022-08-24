import { Link } from "aleph/react";

export default function Header() {
  return (
    <header className="bg-white md-h-19 h-38 flex justify-center px-10 shadow-lg shadow-gray-300 w-screen">
      <div className=" w-full flex justify-between items-center flex-wrap ">
        <nav className="w-full md-w-auto">
          <ul className="flex items-center  justify-center ">
            <li className="mr-4">
              <Link to="/">
                <div className=" text-2xl font-bold hover-text-blue">HomePage</div>
              </Link>

            </li>
            <li className="mr-4">
              <Link to="/history">
                <div className=" text-2xl font-bold hover-text-blue">History</div>
              </Link>
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
              <Link to="/mypage">
                <div className=" text-xl font-bold">github.com</div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

  );
}
