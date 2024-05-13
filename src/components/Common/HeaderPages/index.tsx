import logo from "../../../assets/Home/logo-dpe_3.png";
import { IoMdMenu } from "react-icons/io";
import SessionService from "../../../infrastructure/Services/SessionService";
import EstablishmentEntity from "../../../domain/entities/Establishment";
import { useEffect, useState } from "react";

interface HeaderPagesProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  haveImage?: boolean;
}

const HeaderPages = (props: HeaderPagesProps) => {
  const [est, setEst] = useState<EstablishmentEntity>({} as EstablishmentEntity);

  useEffect(() => {
    const establishment = SessionService.getEstablishmentData();
    if (establishment) {
      setEst(establishment);
    }
  }, []);


  return (
    <header className="border-b-2 border-dark-400 dark:border-primary-500">
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
          {
            est && (
              <div className="flex items-center ml-4">
                <p className="text-white text-md">
                  {est.name}
                </p>
              </div>
            )
          }
        </div>
      </nav>
    </header>
  );
};

export default HeaderPages;
