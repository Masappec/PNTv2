import PersonalContainer from "../../../../../components/Landing/Thematics/Personal/PersonalContainer";
import PublicDataApi from "../../../../../infrastructure/Api/PublicDataApi";


const Personal = () => {
    return (
    

        <PersonalContainer
        usecase={new PublicDataApi()}
        />

    
    );

}

export default Personal