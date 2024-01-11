import { useState } from "react";
import PedagogyAreaEntity from "../../../../domain/entities/PedagodyAreaEntity";
import PedagogyAreaCreatePresenter from "./PedagodyAreaCrearePresenter";

 

 const  PedagogyAreaCreateContainer = () => {

    const [data, set_data] = useState<PedagogyAreaEntity>({
        frequencyAsked:[],
        normative:[],
        tutorialVideo:[],
        id:0,
    });

    return (
        <PedagogyAreaCreatePresenter
            data={data}
            edit={false}
            error=""
            handleSubmit={()=>{}}
            loading={false}
            onEdit={()=>{}}
            setData={()=>{}}
            setEdit={()=>{}}
            setError={()=>{}}
            setSuccess={()=>{}}
            success=""
            key={0}
        />
    )
    
 };

export default PedagogyAreaCreateContainer;