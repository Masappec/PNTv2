import { Tabs } from "flowbite-react";
import SolicitiesResponse from "./SolicitiesResponse";
import { themeTabs } from "../../../../components/Common/Tabs/Theme";
import SolicitiesNoResponse from "./SolicitiesNoResponse";
import SolicitiesResponse3 from '../Solicity/ListEstablishment'
import AllPublications from "../AllPublications";
import SessionService from "../../../../infrastructure/Services/SessionService";


const Reports = () => {


    return (
        <>
         <h2 className='mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary'>
                
                Bienvenido/a al área de gestión de LOTAIP de {" "}
                {SessionService.getEstablishmentData().name}

            </h2>
        <Tabs theme={themeTabs} style="underline">
           
            <Tabs.Item title="Todas las solicitudes"  >
                <SolicitiesResponse3 />
            </Tabs.Item>
            <Tabs.Item title="Solicitudes respondidas" >
                <SolicitiesResponse />
            </Tabs.Item>
            <Tabs.Item title="Solicitudes sin responder" >
                <SolicitiesNoResponse />
            </Tabs.Item>
            <Tabs.Item title="Archivos publicados por mes " >
                <AllPublications />
            </Tabs.Item>
        </Tabs>
        </>

    )

}


export default Reports;