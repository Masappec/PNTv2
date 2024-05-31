import FinanceContainer from "../../../../../components/Landing/Thematics/Presupuesto/FinanceContainer";
import PublicDataApi from "../../../../../infrastructure/Api/PublicDataApi";


const Finance = () => {
    return (
    

        <FinanceContainer
            usecase={new PublicDataApi()}

        />

    
    );

}

export default Finance