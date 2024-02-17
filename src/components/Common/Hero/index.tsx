import { TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import { inputSearchTheme } from "./theme";
import { FormattedMessage } from "react-intl";



const Hero = () => {



    return (
        <section className=" dark:bg-gray-900 mt-2">
            
            {/*<div className="relative">

                <div className="flex flex-row-reverse absolute  items-center mt-60 w-screen">
                    <div className="absolute flex items-center justify-end w-[830px] h-[830px] ">
                        <div className="absolute inset-0 rounded-full bg-radial-gradient bg-[#F7941D]  filter blur-3xl opacity-5 "></div>
                        <div className="relative flex items-center w-[400px] h-[400px]   bg-radial-gradient bg-from-[#F7941D] bg-[#198FB1] filter blur-3xl opacity-20 rounded-full">
                        </div>
                    </div>
                </div>
                </div>*/}
            <div className="grid max-w-screen-xl w-full px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-10 ">
                <div className="lg:col-span-2 r  justify-start m-5 lg:m-0">
                    <p className="text-xl font-bold text-gray-800 dark:text-white w-full lg:w-[120px]" tabIndex={6}>
                        <FormattedMessage id="portal_nacional" />
                    </p>
                </div>
                

                <div className="lg:col-span-8 lg:flex-row lg:justify-end lg:items-center lg:space-x-4 lg:space-y-0 lg:flex">
                    <div className="flex flex-col items-center justify-center w-full">
                        <p className="text-4xl font-normal text-gray-800 dark:text-white w-11/12 lg:w-[52%]" tabIndex={7}>
                            <FormattedMessage id="title_search_entities" />
                        </p>
                        <div className="search mt-20 lg:mt-8 w-full justify-center flex">

                            <TextInput id="buscar" type="text" icon={CiSearch}
                                placeholder="Buscar por entidad pública"
                                alt="Buscar por entidad pública, por ejemplo: Ministerio de Educación"
                                className="lg:w-2/5  md:w-2/5 h-12 mt-4 mr-[110px] w-full "
                                tabIndex={7}
                                theme={inputSearchTheme}
                            />


                        </div>
                        <p className="text-sm font-normal text-gray-800 dark:text-white w-11/12 lg:w-[52%] mt-4" tabIndex={8}>
                            <FormattedMessage
                                id="subtitle_search_entities" values={{
                                    total: 1000,
                                    total_files: 10000
                                }}
                            />
                        </p>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default Hero;