
import { FaXTwitter } from "react-icons/fa6";
import { SiFacebook } from "react-icons/si";
import logo_cd from '../../../assets/fundacion_ciudadani_desarrollo.png'
import datalad from '../../../assets/datalat.png'
const FooterInfo = () => {
  return (
    <footer className="bg-dark-400 text-white py-8 w-screen xl:w-full lg:pl-24 pl-5 ">


      <h5 className="font-bold text-2xl mt-20 mb-6 xl:ml-0 ml-4">Listado de Entidades</h5>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between ">
        <nav className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 justify-center  text-base text-justify sm:gap-[40px] xl:pr-24 ">

          <a href="#" className="text-gray-200 hover:text-gray-200 mt-[60px] xl:mt-5 lg:mt-0  ">
            Función <br /> Ejecutiva
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200 mt-[60px] xl:mt-5 lg:mt-0 ">
            Función <br />Legislativa
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200 mt-[60px] xl:mt-5 lg:mt-0 ">
            Función <br /> Judicial
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200 mt-[60px] xl:mt-5 lg:mt-0 xl:-ml-10  ">
            Función de <br /> Transparencia
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200 mt-[60px] xl:mt-5 lg:mt-0 w-[300px] text-start   ">
            Gobiernos Autónomos Descentralizados
          </a>

        </nav>
      </div>
      <hr className="w-full  border-slate-500 mt-20 -mr-96 " />

      <div className=" mx-auto flex  w-full md:flex-row mt-[80px] ">
        <nav className="flex 
        justify-between mt-4 w-full
        space-x-10
        ">
          <div className="flex">
            <span className="col-span-3 mr-[55px]">Siguenos</span>
            <div className="grid grid-cols-2 gap-20">

              <a href="#" className="text-gray-200 hover:text-gray-200 xl:mt-0 mt-10">
                <SiFacebook size={27} />
              </a>
              <a href="#" className="text-gray-200 hover:text-gray-200 xl:mt-0 mt-10">
                <FaXTwitter size={27} />
              </a>
            </div>
          </div>
          <div className="flex flex-col w-[35%]">

          </div>

          <div className="flex flex-row  w-full ml-12 justify-center">
            <a href="#" className="block  lg:inline-block  mr-4">
              <img src={logo_cd} alt="" className=" w-[84px] h-[84px] " />
            </a>
            <a href="#" className="block  lg:inline-block mr-4">
              <img src={datalad} alt="" className=" w-32 h-14" />
            </a>
            <a href="#" className="block  lg:inline-block mr-4">
              <img src="" alt="" className=" w-[84px] h-[84px] border-2 " />
            </a>
            <a href="#" className="block  lg:inline-block  mr-4">
              <img src="" alt="" className=" w-[84px] h-[84px] border-2 " />
            </a>
            <a href="#" className="block  lg:inline-block  mr-4">
              <img src="" alt="" className=" w-[84px] h-[84px] border-2 " />
            </a>
            <a href="#" className="block  lg:inline-block  mr-4">
              <img src="" alt="" className=" w-[84px] h-[84px] border-2 " />
            </a>
          </div>

        </nav>
      </div>
      <div className="container mx-auto flex flex-col  md:flex-row mt-10 mb-2">
        <nav className="flex flex-col-reverse xl:flex-row  lg:grid-cols-3 lg:space-x-0 xl:space-x-40 xl:-ml-12   
        xl:justify-center text-sm xl:text-justify -mt-6 sm:gap-[40px] md:ml-0">
          <div className="xl:space-x-20 xl:whitespace-nowrap flex justify-center 
          xl:justify-start mt-5 xl:mt-0 ml-12">
            <span className="text-slate-500 xl:whitespace-nowrap whitespace-break-spaces
            text-center
            ">
              Portal Nacional de Transparencia 2024  {"\n"}&copy; 
            </span>
          </div>
          <div className="flex flex-col xl:flex-row space-x-0 xl:space-x-20 xl:whitespace-nowrap 
          text-start xl:ml-2 ml-0 xl:text-left xl:justify-start xl:mt-0 mt-5">

            <a href="#" className="text-gray-200 hover:text-gray-200 ml-0 xl:-ml-12  
            
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
    </footer >
  );
};

export default FooterInfo;
