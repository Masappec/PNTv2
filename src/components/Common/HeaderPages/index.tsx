import logo from "../../../assets/Home/logo-dpe_3.png";
import { IoMdMenu } from "react-icons/io";

interface HeaderPagesProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  haveImage?: boolean;
}

const HeaderPages = (props: HeaderPagesProps) => {
  return (
    <header className="border-b-2 border-dark-400 dark:border-primary-600">
      <nav className="bg-primary-600 border-gray-900 px-4  py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center max-w-screen-xl">
          <a href="#" className="flex items-start  lg:hidden xl:hidden" onClick={() => props.setOpen && props.setOpen(!props.open)}>
            <IoMdMenu className="text-3xl text-white" tabIndex={1} />
          </a>
          {
            props.haveImage && (
              <a href="/" className="flex items-start">
                <img
                  src={logo}
                  className="h-15 sm:h-16"
                  alt="Logo de la defensoria del pueblo"
                  tabIndex={1}
                />
              </a>
            )
          }
        </div>
      </nav>
    </header>
  );
};

export default HeaderPages;
