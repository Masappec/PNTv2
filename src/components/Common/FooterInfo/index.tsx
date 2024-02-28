
import { FaXTwitter } from "react-icons/fa6";
import { SiFacebook } from "react-icons/si";

const FooterInfo = () => {
  return (
    <footer className="bg-dark-400 text-white py-8 w-full lg:pl-24 pl-5 ">
      <div className="sm:flex sm:items-center sm:justify-between "></div>
      <h5 className="font-bold text-2xl mt-20 mb-6">Listado de Entidades</h5>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between ">
        <nav className="grid lg:grid-cols-5 justify-center  text-base text-justify mt-10 -ml-14 pr-24  ">
          
          <a href="#" className="text-gray-200 hover:text-gray-200 mt-5 lg:mt-0  ">
            Función Ejecutiva
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200 mt-5 lg:mt-0 ">
            Función Legislativa
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200 mt-5 lg:mt-0 ">
            Función Judicial
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200 mt-5 lg:mt-0 -ml-10  ">
          Función de Transparencia
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200 mt-5 lg:mt-0 w-[304px] ">
          Gobiernos Autónomos Descentralizados
          </a>
          
        </nav>
      </div>
      <hr className="w-full  border-slate-500 mt-20 -mr-96 " />

      <div className="container mx-auto flex flex-col md:flex-row mt-10 ">
        <nav className="flex space-x-14 justify-center text-base text-justify mt-10 -ml-12">
          <span>Siguenos</span>
          <a href="#" className="text-gray-200 hover:text-gray-200">
            <SiFacebook size={27} />
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200">
            <FaXTwitter size={27} />
          </a>
          <div className="flex space-x-6 pl-80">
          <a href="#" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
            <img src="" alt="" className=" w-[84px] h-[84px] border-2 "/>
          </a>
          <a href="#" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
            <img src="" alt="" className=" w-[84px] h-[84px] border-2 "/>
          </a>
          <a href="#" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
            <img src="" alt="" className=" w-[84px] h-[84px] border-2 "/>
          </a>
          <a href="#" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
            <img src="" alt="" className=" w-[84px] h-[84px] border-2 "/>
          </a>
          <a href="#" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
            <img src="" alt="" className=" w-[84px] h-[84px] border-2 "/>
          </a>
          </div>
        </nav>
      </div>
      <div className="container mx-auto flex flex-col  md:flex-row mt-20 mb-2">
        <nav className="grid lg:grid-cols-3 space-x-60 -ml-12   justify-center text-sm text-justify -mt-6  ">
          <div>
          <span className="text-slate-500 whitespace-nowrap ">
            &copy; {new Date().getFullYear()} Plataforma Nacional de
            Transparencia | Todos los derechos reservados
          </span>
          </div>
          <div className="space-x-20 whitespace-nowrap">
          <a href="#" className="text-gray-200 hover:text-gray-200 -ml-12  ">
            Políticas de uso
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200    ">
            Políticas de privacidad
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200  text-base pl-20  ">
            Versión simplificada HTML
          </a>
         
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default FooterInfo;
