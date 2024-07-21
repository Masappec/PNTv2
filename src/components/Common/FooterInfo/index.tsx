

import logo from "../../../assets/Home/dummy_image.png";

const FooterInfo = () => {   
  return (

    <footer className='bg-[#333333]'>
  <section className='section-container pb-4 pt-8 '>
   
    <div className='border-b border-gray-400 pb-8 pt-4'>
      <h3 className='text-balance text-xl font-semibold text-white'>Listado de Entidades</h3>

      <nav>
        <ul className='mt-8 flex flex-col flex-wrap justify-start gap-x-8 gap-y-4 md:flex-row md:items-center'>
          <li>
            <a
              className='text-gray-300 hover:underline hover:underline-offset-2'
                  href='/entidades?tipo=Función Ejecutiva'
              target='_blank'
              rel='noopener noreferrer'>
              Función Ejecutiva
            </a>
          </li>
          <li>
            <a
              className='text-gray-300 hover:underline hover:underline-offset-2'
              target='_blank'
                  href='/entidades?tipo=Función Legislativa'

              rel='noopener noreferrer'>
              Función Legislativa
            </a>
          </li>
          <li>
            <a
              className='text-gray-300 hover:underline hover:underline-offset-2'
              target='_blank'
                  href='/entidades?tipo=Función Judicial'

              rel='noopener noreferrer'>
              Función Judicial
            </a>
          </li>
          <li>
            <a
              className='text-gray-300 hover:underline hover:underline-offset-2'
              target='_blank'
                  href='/entidades?tipo=Funcion de Transparencia y Control social'

              rel='noopener noreferrer'>
              Función de Transparencia
            </a>
          </li>
          <li>
            <a
              className='text-gray-300 hover:underline hover:underline-offset-2'
                  href='/entidades?tipo=Gobiernos Autónomos Descentralizados'
              target='_blank'
              rel='noopener noreferrer'>
              Gobiernos Autónomos Descentralizados
            </a>
          </li>
              <li>
                <a
                  className='text-gray-300 hover:underline hover:underline-offset-2'
                  href='/entidades?tipo=OTRAS INSTITUCIONES PÚBLICAS'
                  target='_blank'
                  rel='noopener noreferrer'>
                  Empresas Públicas
                </a>
              </li>
        </ul>
      </nav>
    </div>

    <section className='mt-8 flex flex-col items-start justify-between gap-8 md:flex-row'>
     
      <div className='flex items-center justify-center gap-x-8 text-white'>
        <span>Síguenos</span>

        <div className='flex items-center justify-center gap-x-4'>
              <a href='https://www.facebook.com/DefensoriaEC'
              target="_blank"
              className='text-gray-200 hover:text-gray-400'>
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
              <a href='https://x.com/DEFENSORIAEC' 
              
              target="_blank"
              className='text-gray-200 hover:text-gray-400'>
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
