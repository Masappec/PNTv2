
import Hero from "../../Common/Hero";
import Product from "../../Common/Products";
import hero_image from '../../../assets/hero_image.svg';



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
                        icon: <svg className= "w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v1h3a1 1 0 110 2h-3v1a1 1 0 11-2 0V7H7a1 1 0 110-2h1V4a1 1 0 011-1zM5 9a1 1 0 00-1 1v5a1 1 0 001 1h10a1 1 0 001-1V9a1 1 0 00-1-1H5zm5 1a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    }
                ]}
                subtitle="Los datos abiertos son datos que pueden ser utilizados, reutilizados y redistribuidos libremente por cualquier persona, y que se encuentran sujetos, cuando más, al requerimiento de atribución y de compartirse de la misma manera en que aparecen."
            />
        </>
    )

}

export default LandingPresenter;