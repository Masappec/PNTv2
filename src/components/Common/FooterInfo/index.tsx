
import { FaXTwitter } from "react-icons/fa6";
import { SiFacebook } from "react-icons/si";

const FooterInfo = () => {
  return (
    <footer className="bg-dark-400 text-white py-8 w-full pl-24 ">
      <div className="sm:flex sm:items-center sm:justify-between   "></div>
      <h5 className="font-bold text-2xl mt-20 mb-6">Listado de Entidades</h5>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <nav className="flex space-x-16 justify-center text-lg text-justify mt-10">
          <a href="#" className="text-gray-200 hover:text-gray-200">
            Función Ejecutiva
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200">
            Función Legislativa
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200">
            Función Judicial
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200">
            Versión simplificada HTML
          </a>
        </nav>
      </div>
      <hr className="w-full  border-slate-500 mt-20 " />

      <div className="container mx-auto flex flex-col md:flex-row mt-10 ">
        <nav className="flex space-x-16 justify-center text-base text-justify mt-10">
          <span>Siguenos</span>
          <a href="#" className="text-gray-200 hover:text-gray-200">
            <SiFacebook size={25} />
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200">
            <FaXTwitter size={25} />
          </a>
        </nav>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row mt-20 ">
        <nav className="flex space-x-16 justify-center text-base text-justify mt-2">
          <span className="text-slate-500">
            &copy; {new Date().getFullYear()} Plataforma Nacional de
            Transparencia | Todos los derechos reservados
          </span>
          <a href="#" className="text-gray-200 hover:text-gray-200">
            Políticas de uso
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-200">
            Políticas de privacidad
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default FooterInfo;
