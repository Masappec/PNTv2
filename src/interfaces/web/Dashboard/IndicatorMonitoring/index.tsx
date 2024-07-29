import IndicatorsMonitoringPresenter from "../../../../components/Dashboards/IndicatorsMonitoring/IndicatorsMonitoringPresenter"
import PublicDataApi from "../../../../infrastructure/Api/PublicDataApi";



export const IndicatorsMonitoring = ()=>{
    const publicApi = new PublicDataApi();

    return (
        <IndicatorsMonitoringPresenter
            usecase={publicApi}
            year={new Date().getFullYear()}

        />
    )
}