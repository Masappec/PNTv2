import { Link } from "react-router-dom";
import logo from "../../../assets/Home/logo-dpe 1.png";
import { FormattedMessage } from "react-intl";

import { AiOutlineMenu } from "react-icons/ai";

interface Props {
  onOpen: () => void;
}
const Header = (props: Props) => {
  return (
    <header className="border-b-2 border-gray-500 dark:border-primary-600">
      <nav className="bg-white border-gray-900 px-4 lg:px-6 py-2.5 dark:bg-gray-800 ">
        <div className="flex flex-wrap justify-between items-center mx-8 ">
          <a href="/" className="flex items-center ">
            <img
              src={logo}
              className="mr-3 xl:h-20 lg:h-20 h-12  "
              alt="Logo de la defensoria del pueblo"
              tabIndex={1}
            />
          </a>
          <div className="items-center lg:order-2 pr-2 space-x-6 hidden md:block">
            <Link
              to="entidades"
              tabIndex={2}
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-8 py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              <FormattedMessage id="list_entities" />
            </Link>

            <Link
              to="/ingreso"
              tabIndex={3}
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-6 py-2.5  dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              <FormattedMessage id="indicators" />
            </Link>
            <Link
              to="/ingreso"
              tabIndex={4}
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-11 py-2.5   dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              <FormattedMessage id="about" />
            </Link>

            <Link
              to="/ingreso"
              tabIndex={5}
              className="text-white bg-primary-500
                         hover:bg-primary-800 focus:ring-4 
                         
                         focus:ring-blue-300  rounded-full text-lg font-semibold px-10 py-3.5 
                          dark:bg-primary-300 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800
                          
                          
                          "
            >
              <FormattedMessage id="login" />
            </Link>

          </div>
          <div>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              onClick={props.onOpen}
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <AiOutlineMenu size={25} />

            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
