
import { FaXTwitter } from "react-icons/fa6";
import { SiFacebook } from "react-icons/si";

const FooterInfo = () => {
  return (
    <footer className="bg-dark-400 text-white py-8 w-screen xl:w-full lg:pl-24 pl-5 ">
      <div className="sm:flex sm:items-center sm:justify-between "></div>
      <h5 className="font-bold text-2xl mt-20 mb-6 xl:ml-0 ml-4">Listado de Entidades</h5>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between ">
        <nav className="grid grid-cols-1 lg:grid-cols-5 justify-center  text-base text-justify mt-10  xl:pr-24  ">

          <a href="#" className="text-gray-200 hover:text-gray-200 mt-8 xl:mt-5 lg:mt-0  ">
            Función Ejecutiva
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200 mt-8 xl:mt-5 lg:mt-0 ">
            Función Legislativa
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200 mt-8 xl:mt-5 lg:mt-0 ">
            Función Judicial
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200 mt-8 xl:mt-5 lg:mt-0 xl:-ml-10  ">
            Función de Transparencia
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200 mt-8 xl:mt-5 lg:mt-0 w-[304px] ">
            Gobiernos Autónomos Descentralizados
          </a>

        </nav>
      </div>
      <hr className="w-full  border-slate-500 mt-20 -mr-96 " />

      <div className="container mx-auto flex flex-col md:flex-row mt-10 ">
        <nav className="grid grid-cols-3 xl:flex xl:space-x-14 
        xl:justify-center text-base text-justify mt-10
        ml-5 xl:ml-0
        ">
          <span className="col-span-3">Siguenos</span>
          <div className="grid grid-cols-2 space-x-10">

            <a href="#" className="text-gray-200 hover:text-gray-200 xl:mt-0 mt-5">
              <SiFacebook size={27} />
            </a>
            <a href="#" className="text-gray-200 hover:text-gray-200 xl:mt-0 mt-5">
              <FaXTwitter size={27} />
            </a>
          </div>

          <div className="col-span-3 grid grid-cols-3 xl:flex xl:space-x-6 xl:pl-80 xl:mt-0 mt-10">
            <a href="#" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
              <img src="" alt="" className=" w-[84px] h-[84px] border-2 " />
            </a>
            <a href="#" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
              <img src="" alt="" className=" w-[84px] h-[84px] border-2 " />
            </a>
            <a href="#" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
              <img src="" alt="" className=" w-[84px] h-[84px] border-2 " />
            </a>
            <a href="#" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
              <img src="" alt="" className=" w-[84px] h-[84px] border-2 " />
            </a>
            <a href="#" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
              <img src="" alt="" className=" w-[84px] h-[84px] border-2 " />
            </a>
            <a href="#" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
              <img src="" alt="" className=" w-[84px] h-[84px] border-2 " />
            </a>
          </div>
        </nav>
      </div>
      <div className="container mx-auto flex flex-col  md:flex-row mt-20 mb-2">
        <nav className="flex flex-col-reverse xl:flex-row  lg:grid-cols-3 xl:space-x-60 xl:-ml-12   
        xl:justify-center text-sm xl:text-justify -mt-6  ">
          <div className="xl:space-x-20 xl:whitespace-nowrap flex justify-center xl:justify-start mt-5 xl:mt-0">
            <span className="text-slate-500 xl:whitespace-nowrap whitespace-break-spaces
            text-center 
            ">
              Plataforma Nacional de Transparencia  {"\n"}&copy; Todos los derechos reservados
            </span>
          </div>
          <div className="flex flex-col xl:flex-row xl:space-x-20 xl:whitespace-nowrap 
          text-center xl:text-left xl:justify-start xl:mt-0 mt-5">

            <a href="#" className="text-gray-200 hover:text-gray-200 xl:-ml-12  
            
            mt-10 xl:mt-0">

              Políticas de uso
            </a>
            <a href="#" className="text-gray-200 hover:text-gray-200
              
            mt-10 xl:mt-0">
              Políticas de privacidad
            </a>
            <a href="#" className="text-gray-200 hover:text-gray-200  text-base 
            mt-10 xl:mt-0">
              Versión simplificada HTML
            </a>

          </div>
        </nav>
      </div>
    </footer>
  );
};

export default FooterInfo;
