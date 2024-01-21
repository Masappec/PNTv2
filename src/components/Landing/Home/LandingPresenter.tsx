
import Hero from "../../Common/Hero";
import Product from "../../Common/Products";
import hero_image from '../../../assets/hero_image.svg';
import { Banner } from "flowbite-react";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";



const LandingPresenter = () => {
    return (
        <>
            <Hero title="Busca en nuestro catálogo de Datos Abiertos y Solicita los que necesites"
                subtitle="Encontrarás datos de distintas fuentes"
                image={hero_image} imageAlt="Hero Image"
                ctaLinkPrimary="/" ctaTextPrimary="Explorar"
                ctaLinkSecondary="/login"
                ctaTextSecondary="Solictar"
                key={1} />

            <Product
                title="¿Qué son los Datos Abiertos?"
                items={[
                    {
                        title: "Encontrarás datos de distintas fuentes",
                        description: "Los datos abiertos son datos que pueden ser utilizados, reutilizados y redistribuidos libremente por cualquier persona, y que se encuentran sujetos, cuando más, al requerimiento de atribución y de compartirse de la misma manera en que aparecen.",
                        icon: <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v1h3a1 1 0 110 2h-3v1a1 1 0 11-2 0V7H7a1 1 0 110-2h1V4a1 1 0 011-1zM5 9a1 1 0 00-1 1v5a1 1 0 001 1h10a1 1 0 001-1V9a1 1 0 00-1-1H5zm5 1a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    }
                ]}
                subtitle="Los datos abiertos son datos que pueden ser utilizados, reutilizados y redistribuidos libremente por cualquier persona, y que se encuentran sujetos, cuando más, al requerimiento de atribución y de compartirse de la misma manera en que aparecen."
            />
            <Banner className="flex " color="gray">
                <div className="flex w-full p-20 flex-col justify-center border-b border-primary-200 bg-primary-600  dark:border-gray-600 dark:bg-gray-700 md:flex-row">
                    <div className="mb-4 md:mb-0 md:mr-4">
                        <h2 className="mb-1 text-3xl font-semibold text-gray-100 dark:text-white">Explora las distintas fuentes de datos abiertos</h2>
                        <p className="flex items-center text-xl font-normal text-gray-100 dark:text-gray-400">
                            
                            <br />
                            Encuentra entre distintas entidades y solicita los datos que necesites.

                        </p>
                    </div>
                    <div className="flex flex-shrink-0 items-center">
                        <Link
                            to="/entidades"
                            onClick={() => window.scrollTo(0, 0)}
                            className="mr-3 inline-flex items-center justify-center rounded-lg border bg-primary-900
                            px-3 py-2 text-xs font-medium text-gray-100 hover:bg-gray-100 
                            hover:text-cyan-700 focus:z-10 focus:outline-none 
                            w-48
                            h-11
                            focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800
                             dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                        >
                            Entidades
                            <HiArrowRight className="ml-2 h-4 w-4 text-white"  />

                        </Link>
                    </div>
                </div>
            </Banner>
        </>
    )

}

export default LandingPresenter;