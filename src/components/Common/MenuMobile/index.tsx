import { IoMdClose } from "react-icons/io";
import logo from "../../../assets/Home/logo-dpe_3.png";
import { Link } from "react-router-dom";
interface Props {
    open: boolean;
    onClose: () => void;
}

const MenuMobile = (props: Props) => {
    return (
        <div className={`
        ease-in-out transition-all duration-300 
        z-10 bg-[#006284] absolute w-[95%] h-full right-0
         top-0 dark:bg-gray-800  justify-end ${props.open ? "visible" : "hidden"} `}>
            <div className="header-mobile h-[102px] w-full px-5  border-b-2 border-[#2684A4]">
                <div className="flex flex-row justify-between w-full
                    items-center h-full
                ">
                    <img
                        src={logo}
                        className="mr-3  h-15 "
                        alt="Logo de la Defensoria del Pueblo"
                        tabIndex={1}
                    />
                    <button onClick={props.onClose} className="focus:outline-none">
                        <IoMdClose size={25} className="text-white" />
                    </button>

                </div>
            </div>
            <div className="content">
                <ul className="flex flex-col ml-12 h-full">
                    <li className="text-white text-xl  py-12">
                        <Link to="/entidades">Lista de entidades</Link>
                    </li>
                    <li className="text-white text-xl  py-12">
                        <Link to="/">Indicadores</Link>
                    </li>
                    <li className="text-white text-xl py-12">
                        <Link to="/">Acerca de</Link>
                    </li>
                    <li className="text-white text-xl py-12">
                        <Link to="/ingreso"

                            className="bg-gray-50 text-primary-600 font-bold px-16 py-3 rounded-3xl"
                        >Ingresar</Link>
                    </li>
                </ul>
            </div>
        </div>

    );
}

export default MenuMobile;