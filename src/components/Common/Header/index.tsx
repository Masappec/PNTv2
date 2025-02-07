import { Link } from "react-router-dom";
import { LogoDefensoria } from "../LogoDefensoria";
import { useState } from "react";
import PublicUseCase from "../../../domain/useCases/Public/PublicUseCase";

interface Props {
  usecase: PublicUseCase;
}


const Header = (props: Props) => {
  const [visible, setVisible] = useState(false);

  const handleDownload = async () => {
    try {
      // Obtener el informe anual (suponiendo que retorna un JSON con la URL del archivo)
      const response = await props.usecase.getAnualReports(15);
  
      // Asegurar que la estructura contiene la URL del archivo
      if (!response || !response.general || response.general.length === 0) {
        throw new Error("No se encontró el informe anual.");
      }
  
      // Obtener la URL del archivo
      const fileUrl = response.general[0].file; 
  
      // Descargar el archivo desde la URL
      const fileResponse = await fetch(fileUrl);
      const blob = await fileResponse.blob();
  
      // Crear un enlace de descarga
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Informe_Anual.pdf'; // Nombre del archivo
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error descargando el informe:", error);
    }
  };
  

  return (
    <header className='w-full border-b border-gray-300'>
      <div className='section-container flex flex-wrap items-center justify-between py-2'>
        {/* Logo */}
        <a href='/' className='flex cursor-pointer select-none items-center'>
          <span className='sr-only'>Logo de la Defensoría del Pueblo</span>
          <LogoDefensoria className='max-w-32' />
        </a>
        {/* Fin Logo */}
        <button
          id='header-menu-btn'
          data-collapse-toggle='navbar-sticky'
          type='button'
          className='inline-flex h-11 w-11 items-center justify-center rounded-md bg-gray-100 p-2 text-sm text-gray-700 focus:bg-primary focus:text-white focus:outline-none focus:ring-1 lg:hidden'
          aria-controls='navbar-sticky'
          aria-expanded='false'
          onClick={() => setVisible(!visible)}
        ><span className='sr-only'>abrir menú de navegación</span><svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        ><path
          fill='currentColor'
          d='M4 6.3C4 6.13431 4.13431 6 4.3 6H19.7C19.8657 6 20 6.13431 20 6.3V7.7C20 7.86569 19.8657 8 19.7 8H4.3C4.13431 8 4 7.86569 4 7.7V6.3ZM4 11.3C4 11.1343 4.13431 11 4.3 11H19.7C19.8657 11 20 11.1343 20 11.3V12.7C20 12.8657 19.8657 13 19.7 13H4.3C4.13431 13 4 12.8657 4 12.7V11.3ZM4 16.3C4 16.1343 4.13431 16 4.3 16H19.7C19.8657 16 20 16.1343 20 16.3V17.7C20 17.8657 19.8657 18 19.7 18H4.3C4.13431 18 4 17.8657 4 17.7V16.3Z'
        ></path>
          </svg>
        </button>
        {/* Navigation Links */}
        <nav
          className={`${visible && 'hidden'} w-full items-center justify-between lg:order-1 lg:flex lg:w-auto`}
          id='navbar-sticky'>
          <ul className='flex flex-col gap-x-8 gap-y-4 p-4 pt-8 font-medium md:mt-0 lg:flex-row lg:p-0'>
            {/* Navigation Link */}
            <li className='m-0 w-max'>
              <Link
                to='/'
                className='group relative inline-block cursor-pointer rounded-t-md p-2 text-lg transition hover:bg-primary/20'>
                <span className='text-pretty text-base font-medium'>Inicio</span>
                <span
                  className='absolute -bottom-1 left-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6'>
                </span>
                <span
                  className='absolute -bottom-1 right-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6'>
                </span>
              </Link>
            </li>
            <li className='m-0 w-max'>
              <Link
                to='/entidades'
                className='group relative inline-block cursor-pointer rounded-t-md p-2 text-lg transition hover:bg-primary/20'>
                <span className='text-pretty text-base font-medium'>Listado de Entidades</span>
                <span
                  className='absolute -bottom-1 left-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6'>
                </span>
                <span
                  className='absolute -bottom-1 right-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6'>
                </span>
              </Link>
            </li>
            <li className='m-0 w-max'>
              <a
                href='/backend/v1/public/swagger/'
                className='group relative inline-block cursor-pointer rounded-t-md p-2 text-lg transition hover:bg-primary/20'>
                <span className='text-pretty text-base font-medium'>API</span>
                <span
                  className='absolute -bottom-1 left-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6'>
                </span>
                <span
                  className='absolute -bottom-1 right-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6'>
                </span>
              </a>
            </li>
            {/* Navigation Link 
            <li className='m-0 w-max'>
              <Link
                to='/indicadores'
                className='group relative inline-block cursor-pointer rounded-t-md p-2 text-lg transition hover:bg-primary/20'>
                <span className='text-pretty text-base font-medium'>Indicadores</span>
                <span
                  className='absolute -bottom-1 left-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6'>
                </span>
                <span
                  className='absolute -bottom-1 right-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6'>
                </span>
              </Link>
            </li>*/}
            <li className='m-0 w-max'>
              <a
                onClick={handleDownload}
                className='group relative inline-block cursor-pointer rounded-t-md p-2 text-lg transition hover:bg-primary/20'>
                <span className='text-pretty text-base font-medium'>Informe Anual</span>
                <span
                  className='absolute -bottom-1 left-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6'>
                </span>
                <span
                  className='absolute -bottom-1 right-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6'>
                </span>
              </a>
            </li>


             
            {/* Navigation Link */}
            <li className='m-0 w-max'>
              <Link
                to='/acerca-de'
                className='group relative inline-block cursor-pointer rounded-t-md p-2 text-lg transition hover:bg-primary/20'>
                <span className='text-pretty text-base font-medium'>Acerca de</span>
                <span
                  className='absolute -bottom-1 left-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6'>
                </span>
                <span
                  className='absolute -bottom-1 right-1/2 h-0.5 w-0 bg-primary transition-all group-hover:w-3/6'>
                </span>
              </Link>
            </li>
            {/* Primary Button */}
            <li className="mt-2">
              <Link
                type='button'
                to='/ingreso'
                className='hover:bg-primary-800 mt-4 rounded-full bg-primary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400 lg:mt-0'>
                {/* No usar el <a> y <button> solo se lo hizo para facilitar el acceso */}
                <span >Ingresar al Portal</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
};

export default Header;
