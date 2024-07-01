import { useEffect, useState } from "react";
import IndicatorsAdminPresenter from "./IndicatorsAdminPresenter";
import PublicDataApi from "../../../infrastructure/Api/PublicDataApi";
import { PublicDataApiResponse } from "../../../infrastructure/Api/PublicDataApi/interface";

interface Props{
    usecase:PublicDataApi;
}
const IndicatorsAdminContainer = (props:Props) => {

    const [year, ] = useState<number>(new Date().getFullYear())
    const [data, setData] = useState<PublicDataApiResponse>({
        entites_total:{
            not_updated:0,
            total:0,
            updated:0
        },
        solicities:{
            atendidas:[],
            recibidas:[]
        },
        top_20:[],
        top_20_most_visited:[]
    })


    useEffect(() => {
        props.usecase.getPublicDataCount(year).then((response) => {
            setData(response)
        }).catch((error) => {
            console.error(error)
        })
    }, [])

  


    
    return (


        <IndicatorsAdminPresenter

            data={data}
        />

    )
}

export default IndicatorsAdminContainer;