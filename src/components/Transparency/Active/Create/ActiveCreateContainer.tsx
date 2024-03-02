
import { useLocation } from "react-router-dom";
import ActiveCreatePresenter from "./ActiveCreatePresenter";
import NumeralEntity from "../../../../domain/entities/NumeralEntity";
import { useEffect, useState } from "react";

export interface INeedProps{
  numeral: NumeralEntity,
  childs: NumeralEntity[]
}
const ActiveCreateContainer = ()=>{


    const location = useLocation()

    const state = location.state as INeedProps;

    const [numeral,setNumeral] = useState<NumeralEntity>();


    useEffect(()=>{
      if(state){
        setNumeral(state.numeral)
      }
    },[])

    return(
      <ActiveCreatePresenter
        title={numeral?.description||""}
        error=""
        handleSubmit={()=>{}}
        loading={false}
        onChageLogo={()=>{}}
        onEdit={()=>{}}
        setData={()=>{}}
        setError={()=>{}}
        setSuccess={()=>{}}
        success=""
      />
    )
}
export default ActiveCreateContainer