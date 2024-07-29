import { useEffect, useState } from "react";
import IndicatorsAdminPresenter from "./IndicatorsAdminPresenter";
import PublicDataApi from "../../../infrastructure/Api/PublicDataApi";
import { PublicDataApiResponse, Top20 } from "../../../infrastructure/Api/PublicDataApi/interface";
import { Pagination } from "../../../infrastructure/Api";

interface Props{
    usecase:PublicDataApi;
}
const IndicatorsAdminContainer = (props:Props) => {

    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [month, setMonth] = useState<number>(new Date().getMonth()+1)
    const [data, setData] = useState<PublicDataApiResponse>({
        entites_total:{
            not_updated:0,
            total:0,
            updated:0,
            nearly_updated:0
        },
        solicities:{
            atendidas:[],
            recibidas:[]
        },
        top_20_most_visited:[]
    })

    const [table, setTable] = useState<Pagination<Top20>>({
        current: 1,
        limit: 10,
        next: null,
        previous: null,
        results: [],
        to: 0,
        total: 0,
        from: 0,
        total_pages: 0
    })

    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        props.usecase.getPublicDataCount(year,month).then((response) => {
            setData(response)
        }).catch((error) => {
            console.error(error)
        })

        
    }, [year,month])

  
    useEffect(()=>{
        props.usecase.getEstablishmentTableStats(page).then((response) => {
            setTable(response)
        }).catch((error) => {
            console.error(error)
        })
    },[page])

    
    return (


        <IndicatorsAdminPresenter
            data={data}
            current={table.current}
            from={table.from||0}
            onPaginate={setPage}
            pageSize={table.limit}
            to={table.to}
            top_20={table.results}
            total={table.total}
            total_pages={table.total_pages||0}
            onSelectedMonth={setMonth}
            onSelectedYear={setYear}
            month={month}
            year={year}
        />

    )
}

export default IndicatorsAdminContainer;