import Footer from "../Common/Footer";
import FooterInfo from "../Common/FooterInfo";
import Header from "../Common/Header"
import Hero from "../Common/Hero";
import Product from "../Common/Products";
import hero_image from '../../assets/hero_image.svg';



const LandingPresenter = () => {
    return (
        <>
            <Header />
            <Hero title="Busca en nuestro catálogo de Datos Abiertos y Solicita los que necesites" 
            subtitle="Encontrarás datos de distintas fuentes" 
            image={hero_image} imageAlt="Hero Image"
            ctaLinkPrimary="/" ctaTextPrimary="Explorar"
            ctaLinkSecondary="/login"
            ctaTextSecondary="Solictar"
            key={1} />
            
            <Product/>
            <FooterInfo />
        </>
    )

}

export default LandingPresenter;