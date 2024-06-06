/*import { useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/Store";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { useEffect, useState } from "react";
import { ColourOption, Row } from "../../../../utils/interface";
import { RequestPublicApi, ResponsePublicApi } from "../../../../infrastructure/Api/PublicDataApi/interface";
import { sleep } from "../../../../utils/functions";*/

import { useEffect, useState } from "react";
import PublicDataApi from "../../../../infrastructure/Api/PublicDataApi";
import { RequestPersonalApi } from "../../../../infrastructure/Api/PublicDataApi/interface";
import PersonalPresenter from "./PersonalPresenter";
import { useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/Store";
import EstablishmentEntity from "../../../../domain/entities/Establishment";

interface Props{
    usecase:PublicDataApi;
}
const PersonalContainer = (props:Props) => {
    const [total, setTotal] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)


    const [alert, setAlert] = useState<{
        type: 'success' | 'failure' | 'warning' | 'info'
        message: string
    }>({
        type: 'info',
        message: ''
    })
    const [isSearching, SetSearching] = useState<boolean>()
    
    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)
    const [data, setData] = useState<RequestPersonalApi>()
    const [listEnt, setListEnt] = useState<EstablishmentEntity[]>([])
    useEffect(() => {
        setListEnt(_establishments)
    }, [_establishments])

   
    const list: {
        numeral: string,
        data:Row[][]
    }[] = []
    const onUpdate = (data:ResponsePublicApi)=>{
       buildForDataTable(data)
        
       
    }

    const handleSearch = ()=>{
        getPersonalData({
            
        })
    }
    const onChangeEstablishment = (value: string) => {
        setQuery({
            ...query,
            establishment: value
        })
    }

    const buildForDataTable = (data:ResponsePublicApi)=>{
        let columns= [] as Row[]
        columns = data.metadata.columns.map((item) => {
            return {
                key: item,
                value: item,
                is_header: true
            } as Row
        })
        columns = [
            {
                key: 'Institución',
                value: 'Institución',
                is_header: true
            } as Row,
            ...columns
        ]
        const rows = data.data.map((item)=>{

            const list_row = []
            list_row.push({
                key: 'Institución',
                value: data.metadata.establishment_name,
                is_header: false
            } as Row)
            const row = item.map((item)=>{
                return {
                    key:item,
                    value:item
                } as Row
            })
            return [
                ...list_row,
                ...row
            ]
        })

        const elements = list.filter((item) => item.numeral === data.metadata.numeral_description)
        if (elements.length > 0) {
            const index = list.indexOf(elements[0])
            list[index] = {
                numeral: data.metadata.numeral_description,
                data: [
                    ...list[index].data,
                    ...rows
                ]
            }
        } else {
            list.push({
                numeral: data.metadata.numeral_description,
                data: [
                    columns,
                    ...rows
                ]
            })
        }

        
    }
    return (

        <PersonalPresenter
        page={0}
        from={0}
        to={0}
        total={0}
        totalPage={0} 
        setPage={()=>{}
        }
        length={0}  

        onSearch={handleSearch}



            // loadOptions={loadOptions}
            // onSelect={() => { }}
            // onSelectYear={(year) => {
            //     setYear(year)
            // }}
            // selectedYear={year}
            // onChangeEstablishment={onChangeEstablishment}
            // onSearch={handleSearch}
            // tables={dataT}
            // loading={loading}
            // month={query.month}
            // onSelectMonth={(month) => {
            //     setQuery({
            //         ...query,
            //         month: month
            //     })
            // }}
            // alert={alert}
        />

    )

}

export default PersonalContainer