import { FaDownload, FaPlus, FaSearch } from "react-icons/fa";

interface Props {
    textAdd?: string;
    textImport?: string;
    isImport?: boolean;
    onAdd?: () => void;
    onImport?: () => void;
    onSearch: (search: string) => void;
}
const HeaderTable = (props: Props) => {
    return (
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">Buscar...</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FaSearch className="text-gray-400" />
                            </div>
                            <input type="text" id="simple-search" 
                            onChange={(e)=>props.onSearch(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Buscar..." />
                        </div>
                    </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    {
                        props.onAdd &&
                        <button type="button"
                            onClick={props.onAdd}
                            className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                            <FaPlus className="mr-2" />
                            {props.textAdd}
                        </button>
                    }
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                        {
                            props.isImport && <button id="actionsDropdownButton"
                                onClick={props.onImport}
                                data-dropdown-toggle="actionsDropdown"
                                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium 
                            text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100
                             hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700
                              dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
                               dark:hover:bg-gray-700" type="button">
                                <FaDownload className="mr-2" />
                                {props.textImport}
                            </button>
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTable;