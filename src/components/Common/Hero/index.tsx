import { TextInput } from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import { inputSearchTheme } from "./theme";
import { FormattedMessage } from "react-intl";



const Hero = () => {



    return (
        <section className=" dark:bg-gray-900 mt-2">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-10">
                <div className="lg:col-span-2 r justify-start">
                    <p className="text-xl font-bold text-gray-800 dark:text-white w-11/12 lg:w-28" tabIndex={6}>
                        <FormattedMessage id="portal_nacional" />
                    </p>
                </div>
                <div className="lg:col-span-8 lg:flex-row lg:justify-end lg:items-center lg:space-x-4 lg:space-y-0 lg:flex">
                    <div className="flex flex-col items-center justify-center w-full">
                        <p className="text-4xl font-normal text-gray-800 dark:text-white w-11/12 lg:w-[52%]" tabIndex={7}>
                            <FormattedMessage id="title_search_entities" />
                        </p>
                        <div className="search mt-20 lg:mt-8 w-full justify-center flex">

                            <TextInput id="buscar" type="text" icon={FaSearch}
                                placeholder="Buscar por entidad pública"
                                alt="Buscar por entidad pública, por ejemplo: Ministerio de Educación"
                                className="w-2/5 h-12 mt-4 mr-[110px] "
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