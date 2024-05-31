import AudienceContainer from "../../../../../components/Landing/Thematics/Audience/AudienceContainer";
import PublicDataApi from "../../../../../infrastructure/Api/PublicDataApi";


const Audience = () => {
    return (
    

        <AudienceContainer
            usecase={new PublicDataApi()}

        />

    
    );

}

export default Audience