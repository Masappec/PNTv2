
import { ColourOption } from "../../../utils/interface";
import { LogoPortal } from "../LogoPortal";

interface Props {
  loadOptions: (inputValue: string, callback: (options: ColourOption[]) => void) => void;
  countEntities: number;
  countFiles: number;
  onSelect: (value: ColourOption) => void;
}
const Hero = (props: Props) => {

  /*return (
    <section className="dark:bg-gray-900 2xl:mt-10 xl:mt-5 sm:mt-20">
      <div className="xl:grid lg:grid 
      ml-3 xl:ml-10 py-6 mx-auto lg:gap-8 xl:gap-0 lg:py-16 grid-cols-2   xl:grid-cols-10 ">
        <div className="lg:col-span-2 justify-start  ">
          <p
            className="xl:lg:text-3xl text-xl  font-extrabold text-black dark:text-white w-5/12 lg:w-[215px] mt-8"
            tabIndex={6}
          >
            <FormattedMessage id="portal_nacional" />
          </p>
        </div>
        <div className="md:col-span-8 lg:flex-row 
        xl:justify-end xl:items-center lg:space-x-4 lg:space-y-0 lg:flex pt-6 ">
          <div className="flex flex-col xl:items-center xl:justify-center xl:w-full">
            <p
              className="xl:text-4xl lg:text-4xl 
              font-medium
              mt-7 xl:mt-0 lg:mt-0
              text-xl xl:font-normal text-black
               dark:text-white w-[80%] lg:w-[65%] "
              tabIndex={7}
            >
              <FormattedMessage id="title_search_entities" />
            </p>
            <div className="mb-2">
              <div></div>
            </div>

            <div className="flex xl:hidden lg:hidden w-full h-auto flex-auto">
              <p className="text-gray-500 text-sm mt-5">
                Escribe aquí la entidad que deseas consultar
              </p>
            </div>

            <div className="relative search 
            lg:mt-8 w-full h-auto 
            
            xl:justify-center flex   lg:m-0
             flex-auto">
              <div className="relative lg:w-full w-[90%] xl:w-[730px]">
                <CustomSearch
                  colourOptions={[]}
                  loadOptions={props.loadOptions}
                  onSelect={props.onSelect}
                />
              </div>


            </div>



            <p
              className="text-base font-normal  text-gray-800 dark:text-white w-11/12 lg:w-[65%] mt-2"
              tabIndex={8}
            >
              <FormattedMessage
                id="subtitle_search_entities"
                values={{
                  total: props.countEntities,
                  total_files: props.countFiles,
                }}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );*/

  return (<section className='section-container relative flex flex-wrap justify-between gap-8 pt-16'>
    <LogoPortal className='w-full h-max max-w-64' />

    <article className='max-w-3xl'>
      <h1 className='mb-4 text-balance text-3xl font-normal leading-tight md:text-[40px]'>
        Accede a la información que publican las entidades del estado ecuatoriano en cumplimiento
        de la LOTAIP
      </h1>

      <form role='search' className='group flex rounded-full border border-gray-300 bg-white'>
        <input
          type='search'
          className='text-black-medium m-2 w-3/4 rounded-md border-none p-2 text-lg text-gray-800 focus:outline-none focus:ring-0'
          placeholder='Escribe aquí la entidad que deseas consultar'
        />

        <button
          type='button'
          className='flex w-1/4 items-center justify-center gap-x-4 rounded-r-full border border-primary bg-primary px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400'>
          <span className='hidden sm:block'>Buscar</span>
          <svg
            className='size-4'
            xmlns='http://www.w3.org/2000/svg'
            width='26'
            height='26'
            viewBox='0 0 26 26'
            fill='none'>
            <path
              d='M25 25L20.3335 20.3333M23.6667 12.3333C23.6667 18.5926 18.5926 23.6667 12.3333 23.6667C6.07411 23.6667 1 18.5926 1 12.3333C1 6.07411 6.07411 1 12.3333 1C18.5926 1 23.6667 6.07411 23.6667 12.3333Z'
              stroke='white'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'></path>
          </svg>
        </button>
      </form>

      <p className='mt-2 text-slate-600'>
        {props.countEntities} total de entidades públicas y 5004 total de archivos publicados.
      </p>
    </article>
  </section>)
};

export default Hero;
