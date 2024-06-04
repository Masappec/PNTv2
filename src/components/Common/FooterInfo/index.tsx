

import logo from "../../../assets/Home/dummy_image.png";

const FooterInfo = () => {   
  return (

    <footer className='bg-[#333333]'>
  <section className='section-container pb-4 pt-8 '>
   
    <div className='border-b border-gray-400 pb-8 pt-4'>
      <h3 className='text-balance text-xl font-semibold text-white'>Listado de Entidades</h3>

      <nav>
        <ul
          className='mt-8 flex flex-col flex-wrap justify-start gap-x-16 gap-y-4 md:flex-row md:items-center'>
          <li>
            <a
              className='text-gray-300 hover:underline hover:underline-offset-2'
              href='https://www.gobiernoabierto.ec/'
              target='_blank'
              rel='noopener noreferrer'>
              Función Ejecutiva
            </a>
          </li>
          <li>
            <a
              className='text-gray-300 hover:underline hover:underline-offset-2'
              href='https://www.gobiernoabierto.ec/'
              target='_blank'
              rel='noopener noreferrer'>
              Función Legislativa
            </a>
          </li>
          <li>
            <a
              className='text-gray-300 hover:underline hover:underline-offset-2'
              href='https://www.gobiernoabierto.ec/'
              target='_blank'
              rel='noopener noreferrer'>
              Función Judicial
            </a>
          </li>
          <li>
            <a
              className='text-gray-300 hover:underline hover:underline-offset-2'
              href='https://www.gobiernoabierto.ec/'
              target='_blank'
              rel='noopener noreferrer'>
              Función de Transparencia
            </a>
          </li>
          <li>
            <a
              className='text-gray-300 hover:underline hover:underline-offset-2'
              href='https://www.gobiernoabierto.ec/'
              target='_blank'
              rel='noopener noreferrer'>
              Gobiernos Autónomos Descentralizados
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <section className='mt-8 flex flex-col items-start justify-between gap-8 md:flex-row'>
     
      <div className='flex items-center justify-center gap-x-8 text-white'>
        <span>Síguenos</span>

        <div className='flex items-center justify-center gap-x-4'>
          <a href='#' className='text-gray-200 hover:text-gray-400'>
            <svg
              stroke='currentColor'
              fill='currentColor'
              stroke-width='0'
              role='img'
              viewBox='0 0 24 24'
              height='27'
              width='27'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z'
              ></path>
            </svg>
          </a>
          <a href='#' className='text-gray-200 hover:text-gray-400'>
            <svg
              stroke='currentColor'
              fill='currentColor'
              stroke-width='0'
              viewBox='0 0 512 512'
              height='27'
              width='27'
              xmlns='http://www.w3.org/2000/svg'
              ><path
                d='M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z'
              ></path>
            </svg>
          </a>
        </div>
      </div>

      
      <div
        className='grid grid-cols-2 flex-wrap items-center justify-center gap-4 sm:grid-cols-3 lg:grid-cols-6'>
        <img
          className='h-[84px] w-[84px] object-cover object-center'
          loading='lazy'
          src={logo}
          alt='Logo del Gobierno de Ecuador'
        />
        <img
          className='h-[84px] w-[84px] object-cover object-center'
          loading='lazy'
          src={logo}
          alt='Logo del Gobierno de Ecuador'
        />
        <img
          className='h-[84px] w-[84px] object-cover object-center'
          loading='lazy'
          src={logo}
          alt='Logo del Gobierno de Ecuador'
        />
        <img
          className='h-[84px] w-[84px] object-cover object-center'
          loading='lazy'
          src={logo}
          alt='Logo del Gobierno de Ecuador'
        />
        <img
          className='h-[84px] w-[84px] object-cover object-center'
          loading='lazy'
          src={logo}
          alt='Logo del Gobierno de Ecuador'
        />
        <img
          className='h-[84px] w-[84px] object-cover object-center'
          loading='lazy'
          src={logo}
          alt='Logo del Gobierno de Ecuador'
        />
      </div>
    </section>


    <div className='mt-8 flex flex-wrap items-center justify-between gap-4 text-sm'>
      <span className='text-balance text-gray-400'>Portal Nacional de Transparencia 2024 </span>

      <div className='flex items-center gap-4 text-gray-300'>
        <a className='hover:underline hover:underline-offset-2' href='#'>
          Políticas y Condiciones de Uso del Sitio
        </a>
      </div>
    </div>
  </section>
</footer>
  
  );
};

export default FooterInfo;
  // <footer className="bg-dark-400 text-white py-8 w-screen xl:w-full lg:pl-24 pl-5 ">


    //   <h5 className="font-bold text-2xl mt-20 mb-6 xl:ml-0 ml-4">Listado de Entidades</h5>
    //   <div className="container mx-auto flex flex-col md:flex-row items-center justify-between ">
    //     <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center  text-base md:text-justify sm:gap-[40px] xl:pr-24 ">

    //       <a href="#" className="text-gray-200 hover:text-gray-200 mt-[60px] xl:mt-5 lg:mt-0  ">
    //         Función <br /> Ejecutiva
    //       </a>
    //       <a href="#" className="text-gray-200 hover:text-gray-200 mt-[60px] xl:mt-5 lg:mt-0 ">
    //         Función <br />Legislativa
    //       </a>
    //       <a href="#" className="text-gray-200 hover:text-gray-200 mt-[60px] xl:mt-5 lg:mt-0 ">
    //         Función <br /> Judicial
    //       </a>
    //       <a href="#" className="text-gray-200 hover:text-gray-200 mt-[60px] xl:mt-5 lg:mt-0 xl:-ml-10  ">
    //         Función de <br /> Transparencia
    //       </a>
    //       <a href="#" className="text-gray-200 hover:text-gray-200 mt-[60px] xl:mt-5 lg:mt-0 w-[300px] text-start   ">
    //         Gobiernos Autónomos Descentralizados
    //       </a>

    //     </nav>
    //   </div>
    //   <hr className="w-full  border-slate-500 mt-20 -mr-96 " />

    //   <div className=" mx-auto flex  w-full md:flex-row mt-[80px] ">
    //     <nav className="lg:flex 
    //     flex-col lg:flex-row
    //     justify-between mt-4 w-full
    //     space-x-10
    //     ">
    //       <div className="flex">
    //         <span className="col-span-3 mr-[55px]">Siguenos</span>
    //         <div className="grid grid-cols-2 gap-20">

    //           <a href="#" className="text-gray-200 hover:text-gray-200 xl:mt-0 mt-10">
    //             <SiFacebook size={27} />
    //           </a>
    //           <a href="#" className="text-gray-200 hover:text-gray-200 xl:mt-0 mt-10">
    //             <FaXTwitter size={27} />
    //           </a>
    //         </div>
    //       </div>
    //       <div className="flex flex-col w-[35%]">

    //       </div>

    //       <div className="lg:flex grid grid-cols-2 w-auto   lg:w-full lg:ml-12 lg:justify-center">
    //         <a href="#" className="block  lg:inline-block  lg:mr-4">
    //            <img src={placeHolderImage()} alt="" className=" w-[84px] h-[84px] " />
    //         </a>
    //         <a href="#" className="  lg:inline-block lg:mr-4">
    //           <img src={placeHolderImage()} alt="" className=" w-[84px] h-[84px] " />
    //         </a>
    //         <a href="#" className="block  lg:inline-block lg:mr-4">
    //            <img src={placeHolderImage()} alt="" className=" w-[84px] h-[84px] " />
    //         </a>
    //         <a href="#" className="block  lg:inline-block  lg:mr-4">
    //            <img src={placeHolderImage()} alt="" className=" w-[84px] h-[84px] " />
    //         </a>
    //         <a href="#" className="block  lg:inline-block  lg:mr-4">
    //            <img src={placeHolderImage()} alt="" className=" w-[84px] h-[84px] " />
    //         </a>
    //         <a href="#" className="block  lg:inline-block  lg:mr-4">
    //            <img src={placeHolderImage()} alt="" className=" w-[84px] h-[84px] " />
    //         </a>
    //       </div>

    //     </nav>
    //   </div>
    //   <div className="container mx-auto flex flex-col  md:flex-row mt-10 mb-2">
    //     <nav className="flex flex-col-reverse xl:flex-row  lg:grid-cols-3 lg:space-x-0 xl:space-x-40 xl:-ml-12   
    //     xl:justify-center text-sm xl:text-justify -mt-6 sm:gap-[40px] md:ml-0">
    //       <div className="xl:space-x-20 xl:whitespace-nowrap flex justify-center 
    //       xl:justify-start mt-5 xl:mt-0 ml-12">
    //         <span className="text-slate-500 xl:whitespace-nowrap whitespace-break-spaces
    //         text-center
    //         ">
    //           Portal Nacional de Transparencia 2024  {"\n"}&copy;
    //         </span>
    //       </div>
    //       <div className="flex flex-col xl:flex-row space-x-0 xl:space-x-20 xl:whitespace-nowrap 
    //       text-start xl:ml-2 ml-0 xl:text-left xl:justify-start xl:mt-0 mt-5">

    //         <a href="#" className="text-gray-200 hover:text-gray-200 ml-0 xl:-ml-12  
            
    //         mt-10 xl:mt-0">

    //           Políticas de uso
    //         </a>
    //         <a href="#" className="text-gray-200 hover:text-gray-200
              
    //         mt-10 xl:mt-0">
    //           Políticas de privacidad
    //         </a>
    //         <a href="#" className="text-gray-200 hover:text-gray-200  text-base 
    //         mt-10 xl:mt-0">
    //           Versión simplificada HTML
    //         </a>

    //       </div>
    //     </nav>
    //   </div>
    // </footer >