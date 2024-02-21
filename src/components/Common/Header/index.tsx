import { Link } from "react-router-dom";
import logo from "../../../assets/Home/logo-dpe 1.png";
import { FormattedMessage } from "react-intl";

const Header = () => {
    return (
        <header className="border-b-2 border-dark-400 dark:border-primary-600">
            <nav className="bg-white border-gray-900 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-8 ">
                    <a href="/" className="flex items-center">
                        <img src={logo} className="mr-3 h-20 " alt="Logo de la defensoria del pueblo" tabIndex={1} />
                    </a>
                    <div className="flex items-center lg:order-1 w-1/6">
                    </div>
                    <div className=" items-center lg:order-2 hidden lg:flex space-x-8 ">
                        <Link to="/entidades"
                        tabIndex={2}
                        className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-8 py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                            <FormattedMessage id="list_entities" />
                        </Link>

                        <Link to="/ingreso" 
                        tabIndex={3}
                        className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5  dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                            <FormattedMessage id="indicators" />
                        </Link>
                        <Link to="/ingreso" 
                        tabIndex={4}
                        className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-11 py-2.5   dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                            <FormattedMessage id="about" />
                        </Link>

                        <Link to="/ingreso" 
                        tabIndex={5}
                        className="text-white bg-primary-500
                         hover:bg-primary-800 focus:ring-4 
                         
                         focus:ring-blue-300 font-medium rounded-3xl text-sm px-6 py-3.5 
                          dark:bg-primary-300 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800
                          
                          
                          ">
                            <FormattedMessage id="login" />

                        </Link>
                        <button data-collapse-toggle="mobile-menu-2" type="button"
                            className="inline-flex hidden items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>

                </div>
            </nav>
        </header>

    )
}

export default Header;