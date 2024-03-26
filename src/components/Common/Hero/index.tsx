import { FaSearch } from "react-icons/fa";

import { FormattedMessage } from "react-intl";

const Hero = () => {
  return (
    <section className=" dark:bg-gray-900 mt-2 ">
      <div className="grid max-w-screen-xl ml-10 py-6 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-10 ">
        <div className="lg:col-span-2 justify-start">
          <p
            className="text-2xl text-left font-extrabold text-black dark:text-white w-auto flex lg:w-32   "
            tabIndex={7}
          >
            <FormattedMessage id="portal_nacional" />
          </p>
        </div>
        <div className="lg:col-span-8 lg:flex-row lg:justify-end lg:items-center lg:space-x-4 lg:space-y-0 lg:flex pt-6 ">
          <div className="flex flex-col items-center justify-center w-full">
            <p
              className="text-4xl font-normal text-black dark:text-white w-auto lg:w-[65%] "
              tabIndex={7}
            >
              <FormattedMessage id="title_search_entities"   />
            </p>
            <div className="mb-2">
              <div></div>
            </div>
            <div className=" relative search mt-20 lg:mt-8 w-full h-auto justify-center flex ml-48  flex-auto  ">
              <div className=" relative  ">
                <input
                  id="buscar"
                  type="text"
                  placeholder="Escribe aquí la entidad que deseas consultar"
                  alt="Buscar por entidad pública, por ejemplo: Ministerio de Educación"
                  className="w-[730px] h-[58px] mt-4 mr-[150px] border-t-2 border-gray-900  rounded-full py-3 text-lg justify-start pl-6"
                  tabIndex={7}
                  
                 
                />
              </div>

              <div className="py-11">
                <button
                  disabled
                  type="button"
                  onClick={() => {}}
                  className="!absolute w-[147px] border-l-2 border-gray-900 top-4 right-56 flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-normal rounded-full text-xl px-4 h-[58px] bottom-2"
                >
                  Buscar
                  <FaSearch size="25" className="ml-6 " />
                </button>
              </div>
            </div>
            <p
              className="text-base font-normal  text-gray-800 dark:text-white w-11/12 lg:w-[65%] mt-2"
              tabIndex={8}
            >
              <FormattedMessage
                id="subtitle_search_entities"
                values={{
                  total: 1000,
                  total_files: 10000,
                }}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
