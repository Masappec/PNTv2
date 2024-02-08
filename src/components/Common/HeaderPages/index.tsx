
import logo from "../../../assets/Home/logo-dpe 1.png";

const HeaderPages = () => {
    return (
        <header className="border-b-2 border-dark-400 dark:border-primary-600">
            <nav className="bg-cyan-800 border-gray-900 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="/" className="flex items-center">
                        <img src={logo} className="mr-3 h-15 sm:h-16" alt="Logo de la defensoria del pueblo" tabIndex={1} />
                    </a>
                    </div>
                    </nav>
                    </header>
    )
}

export default HeaderPages