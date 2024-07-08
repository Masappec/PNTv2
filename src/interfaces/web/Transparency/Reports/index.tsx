import { Tabs } from "flowbite-react";
import AllSolicities from "./AllSolicities";
import SolicitiesResponse from "./SolicitiesResponse";
import { themeTabs } from "../../../../components/Common/Tabs/Theme";
import SolicitiesNoResponse from "./SolicitiesNoResponse";
import FilePublications from "./FilePublications";



const Reports = () => {


    return (
        <Tabs theme={themeTabs} style="underline">
            <Tabs.Item title="Todas las solicitudes"  >
            <AllSolicities />
            </Tabs.Item>
            <Tabs.Item title="Solicitudes respondidas" >
                <SolicitiesResponse />
            </Tabs.Item>
            <Tabs.Item title="Solicitudes sin responder" >
                <SolicitiesNoResponse />
            </Tabs.Item>
            <Tabs.Item title="Archivos publicados por mes " >
                <FilePublications />
            </Tabs.Item>
        </Tabs>
    )

}


export default Reports;