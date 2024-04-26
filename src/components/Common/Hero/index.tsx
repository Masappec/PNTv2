import { FormattedMessage } from "react-intl";
import { CustomSearch } from "../CustomSearch";
import { ColourOption } from "../../../utils/interface";

interface Props {
  loadOptions: (inputValue: string, callback: (options: ColourOption[]) => void) => void;
  countEntities: number;
  countFiles: number;
  onSelect: (value: ColourOption) => void;
}
const Hero = (props: Props) => {

  return (
    <section className="dark:bg-gray-900 mt-2 ">
      <div className="xl:grid lg:grid xl:max-w-screen-xl sm:w-screen ml-3 xl:ml-10 py-6 mx-auto lg:gap-8 xl:gap-0 lg:py-16 sm:grid-cols-1 lg:grid-cols-10 ">
        <div className="lg:col-span-2 justify-start  ">
          <p
            className="xl:lg:text-3xl text-xl  font-extrabold text-black dark:text-white  w-5/12 lg:w-[215px] mt-8"
            tabIndex={6}
          >
            <FormattedMessage id="portal_nacional" />
          </p>
        </div>
        <div className="lg:col-span-8 lg:flex-row lg:justify-end lg:items-center lg:space-x-4 lg:space-y-0 lg:flex pt-6 ">
          <div className="flex flex-col items-center justify-center w-full">
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
              <div className="relative lg:w-full xl:w-[730px]">
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
  );
};

export default Hero;
