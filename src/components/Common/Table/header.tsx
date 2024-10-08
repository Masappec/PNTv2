import { FaDownload, FaSearch } from "react-icons/fa";
import { RxCardStackPlus } from "react-icons/rx";

interface Props {
    textAdd?: string;
    textImport?: string;
    isImport?: boolean;
    onAdd?: () => void;
    onImport?: () => void;
    onSearch?: (search: string) => void;
    limits?: number[];
    onChangesLimit?: (limit: number) => void;
}
const HeaderTable = (props: Props) => {
    return (
        <div className="bg-white dark:bg-gray-800 relative  sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                        {
                            props.onSearch && (<><label htmlFor="simple-search" className="sr-only">Buscar...</label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FaSearch className="text-gray-400" />
                                    </div>
                                    <input type="text" id="simple-search"
                                        onChange={(e) => props.onSearch && props.onSearch(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Buscar..." />
                                </div></>)
                        }
                        {
                            props.limits && <select
                                onChange={(e) => props.onChangesLimit && props.onChangesLimit(parseInt(e.target.value))}
                                className="w-24 ml-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                {
                                    props.limits.map(limit => (
                                        <option key={limit} value={limit}>{limit}</option>
                                    ))
                                }
                            </select>

                        }
                        {
                            props.onAdd &&

                            <button type="button"
                                onClick={props.onAdd}
                                className="w-[100px] h-[40px] ml-3 flex items-center justify-center text-white bg-[#B5B5B5] hover:bg-primary-300 font-medium rounded-lg text-sm px-4 py-2 ">
                                <RxCardStackPlus size={25} className="mr-2 " />
                                Nuevo
                            </button>
                        }
                    </form>
                </div>
                <div className="w-full md:w-auto flex flex-col 
                md:flex-row space-y-2 md:space-y-0 items-stretch
                 md:items-center justify-end md:space-x-3 flex-shrink-0">

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