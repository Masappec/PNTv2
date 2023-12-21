import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

interface NavbarProps {
    username: string;
}

const Navbar = ({...props}:NavbarProps) => {

    const [menu, setMenu] = useState(false);


    const onMenuClick = () => {
        setMenu(!menu);
    }

    return (
        <>
            <header className="px-4 py-2 shadow">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <button data-menu className="p-4 -ml-3 focus:outline-none" type="button">
                            <svg className="fill-current w-5" viewBox="0 -21 384 384">
                                <path d="M362.668 0H21.332C9.578 0 0 9.578 0 21.332V64c0 11.754 9.578 21.332 21.332 21.332h341.336C374.422 85.332 384 75.754 384 64V21.332C384 9.578 374.422 0 362.668 0zm0 0M362.668 128H21.332C9.578 128 0 137.578 0 149.332V192c0 11.754 9.578 21.332 21.332 21.332h341.336c11.754 0 21.332-9.578 21.332-21.332v-42.668c0-11.754-9.578-21.332-21.332-21.332zm0 0M362.668 256H21.332C9.578 256 0 265.578 0 277.332V320c0 11.754 9.578 21.332 21.332 21.332h341.336c11.754 0 21.332-9.578 21.332-21.332v-42.668c0-11.754-9.578-21.332-21.332-21.332zm0 0" />
                            </svg>
                        </button>

                        <button data-search className="p-4 md:hidden focus:outline-none" type="button">
                            <svg data-search-icon className="fill-current w-4" viewBox="0 0 512 512"
                                style={{ top: "0.7rem", left: "1rem" }}>
                                <path d="M225.474 0C101.151 0 0 101.151 0 225.474c0 124.33 101.151 225.474 225.474 225.474 124.33 0 225.474-101.144 225.474-225.474C450.948 101.151 349.804 0 225.474 0zm0 409.323c-101.373 0-183.848-82.475-183.848-183.848S124.101 41.626 225.474 41.626s183.848 82.475 183.848 183.848-82.475 183.849-183.848 183.849z" />
                                <path d="M505.902 476.472L386.574 357.144c-8.131-8.131-21.299-8.131-29.43 0-8.131 8.124-8.131 21.306 0 29.43l119.328 119.328A20.74 20.74 0 00491.187 512a20.754 20.754 0 0014.715-6.098c8.131-8.124 8.131-21.306 0-29.43z" /></svg>
                        </button>

                        <div data-search-form className="relative mr-3 hidden md:inline-block">
                            <div className="text-gray-500">
                                <svg data-search-icon className="absolute fill-current w-4" viewBox="0 0 512 512"
                                    style={{ top: "0.7rem", left: "1rem" }}>
                                    <path d="M225.474 0C101.151 0 0 101.151 0 225.474c0 124.33 101.151 225.474 225.474 225.474 124.33 0 225.474-101.144 225.474-225.474C450.948 101.151 349.804 0 225.474 0zm0 409.323c-101.373 0-183.848-82.475-183.848-183.848S124.101 41.626 225.474 41.626s183.848 82.475 183.848 183.848-82.475 183.849-183.848 183.849z" />
                                    <path d="M505.902 476.472L386.574 357.144c-8.131-8.131-21.299-8.131-29.43 0-8.131 8.124-8.131 21.306 0 29.43l119.328 119.328A20.74 20.74 0 00491.187 512a20.754 20.754 0 0014.715-6.098c8.131-8.124 8.131-21.306 0-29.43z" /></svg>
                            </div>
                            <input type="text" placeholder="Search" name="search" id="search" className="h-auto pl-10 py-2 bg-gray-200 text-sm border border-gray-500 rounded-full focus:outline-none focus:bg-white" />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <button data-messages 
                        className="p-3 mr-2 focus:outline-none hover:bg-gray-200 hover:rounded-md" type="button">
                            <svg className="fill-current w-5" viewBox="0 0 512 512">
                                <path d="M339.392 258.624L512 367.744V144.896zM0 144.896v222.848l172.608-109.12zM480 80H32C16.032 80 3.36 91.904.96 107.232L256 275.264l255.04-168.032C508.64 91.904 495.968 80 480 80zM310.08 277.952l-45.28 29.824a15.983 15.983 0 01-8.8 2.624c-3.072 0-6.112-.864-8.8-2.624l-45.28-29.856L1.024 404.992C3.488 420.192 16.096 432 32 432h448c15.904 0 28.512-11.808 30.976-27.008L310.08 277.952z" /></svg>
                        </button>
                        <button data-notifications className="p-3 mr-3 focus:outline-none hover:bg-gray-200 hover:rounded-md" type="button">
                            <svg className="fill-current w-5" viewBox="-21 0 512 512">
                                <path d="M213.344 512c38.636 0 70.957-27.543 78.379-64H134.965c7.426 36.457 39.746 64 78.379 64zm0 0M362.934 255.98c-.086 0-.172.02-.258.02-82.324 0-149.332-66.988-149.332-149.332 0-22.637 5.207-44.035 14.273-63.277-4.695-.446-9.453-.723-14.273-.723-82.473 0-149.332 66.855-149.332 149.332v59.477c0 42.218-18.496 82.07-50.946 109.503C2.25 370.22-2.55 384.937 1.332 399.297c4.523 16.703 21.035 27.371 38.36 27.371H386.89c18.175 0 35.308-11.777 38.996-29.59 2.86-13.781-2.047-27.543-12.735-36.523-31.02-26.004-48.96-64.215-50.218-104.575zm0 0" />
                                <path style={{ fill: "red;" }} d="M469.344 106.668c0 58.91-47.754 106.664-106.668 106.664-58.91 0-106.664-47.754-106.664-106.664C256.012 47.758 303.766 0 362.676 0c58.914 0 106.668 47.758 106.668 106.668zm0 0" /></svg>
                        </button>

                        <button 
                        onClick={onMenuClick}
                        className="flex items-center px-3 py-2 focus:outline-none hover:bg-gray-200 hover:rounded-md" 
                        type="button" >
                        <FaUserCircle size={35} className='text-gray-800' />


                            <span className="ml-4 text-sm hidden md:inline-block">
                                {props.username}
                            </span>
                            <svg className="fill-current w-3 ml-4" viewBox="0 0 407.437 407.437">
                                <path d="M386.258 91.567l-182.54 181.945L21.179 91.567 0 112.815 203.718 315.87l203.719-203.055z" /></svg>

                            <div className={"text-sm text-left absolute top-0 right-0 mt-16 mr-4 "+ (menu ? "" : "hidden ") +
                             "bg-white rounded border border-gray-400 shadow ease-out duration-300"}>
                                <ul>
                                    <li className="px-4 py-3 border-b hover:bg-gray-200"><a href="#">My Profile</a></li>
                                    <li className="px-4 py-3 border-b hover:bg-gray-200"><a href="#">Settings</a></li>
                                    <li className="px-4 py-3 hover:bg-gray-200"><a href="#">Log out</a></li>
                                </ul>
                            </div>
                        </button>

                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar;