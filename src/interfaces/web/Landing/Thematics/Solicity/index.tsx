import SolicityContainer from "../../../../../components/Landing/Thematics/Solicity/SolicityContainer";
import PublicDataApi from "../../../../../infrastructure/Api/PublicDataApi";


const Solicity = () => {
    return (
    

        <SolicityContainer
            usecase={new PublicDataApi()}

        />

    
    );

}

export default Solicity