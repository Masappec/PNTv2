import SolicityPresenter from "./SolicityPresenter"
import { useEffect, useState } from "react"
import { ColourOption, Row } from "../../../../utils/interface"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import { useSelector } from "react-redux"
import { RootState } from "../../../../infrastructure/Store"
import { RequestPublicApi, ResponsePublicApi } from "../../../../infrastructure/Api/PublicDataApi/interface"
import { sleep } from "../../../../utils/functions"
import PublicDataApi from "../../../../infrastructure/Api/PublicDataApi"
interface Props {
    usecase: PublicDataApi;
}
const SolicityContainer = (props:Props) => {
    const [total, setTotal] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)




    const [isSearching, SetSearching] = useState<boolean>()
    const [dataT, setData] = useState<{
        numeral: string,
        data: Row[][]
    }[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)
    const [query, setQuery] = useState<RequestPublicApi>({
        article: "19",
        establishment: "",
        fields: [],
        month: (new Date().getMonth() + 1) + "",
        numerals: [
            "Numeral 5",
            "Numeral 22",
        ],
        search: "",
        year: new Date().getFullYear().toString(),
    })
    const [alert, setAlert] = useState<{
        type: 'success' | 'failure' | 'warning' | 'info'
        message: string
    }>({
        type: 'info',
        message: ''
    })
    const [listEnt, setListEnt] = useState<EstablishmentEntity[]>([])
    const [year, setYear] = useState<number>(new Date().getFullYear())
    useEffect(() => {
        setListEnt(_establishments)
    }, [_establishments])

    const loadOptions = (inputValue: string, callback: (options: ColourOption[]) => void) => {
        if (!inputValue) {
            return;
        }


        if (isSearching) {
            return;
        }

        SetSearching(true)
        const filter = listEnt.filter((item) => {
            return item.name.toLowerCase().includes(inputValue.toLowerCase())
        }).slice(0, 3)
        SetSearching(false)
        callback(filter.map((item) => {
            const data: ColourOption = {
                value: item.identification || "",
                label: item.name,
                color: "#00B8D9",
            }
            return data;
        }))
    }

    const list: {
        numeral: string,
        data: Row[][]
    }[] = []
    const onUpdate = (data: ResponsePublicApi) => {
        buildForDataTable(data)


    }

    const handleSearch = () => {
        setData([])
        setLoading(true)
        props.usecase.getPublicData(query, onUpdate).then(() => {

            sleep(4000).then(() => {
                if (list.length === 0) {
                    setAlert({
                        type: 'info',
                        message: 'No se encontraron resultados'
                    })
                }
                setData(list)
                setLoading(false)
            })
        }).catch(() => {
            setAlert({
                type: 'failure',
                message: 'Error al obtener los datos'
            })
            setLoading(false)
        })
    }
    const onChangeEstablishment = (value: string) => {
        setQuery({
            ...query,
            establishment: value
        })
    }

    const buildForDataTable = (data: ResponsePublicApi) => {
        let columns = [] as Row[]
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
        const rows = data.data.map((item) => {

            const list_row = []
            list_row.push({
                key: 'Institución',
                value: data.metadata.establishment_name,
                is_header: false
            } as Row)
            const row = item.map((item) => {
                return {
                    key: item,
                    value: item
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
    return(

   <SolicityPresenter

   page={currentPage}
   from={from}
   to={to}
   total={total}
   totalPage={totalPage} 
   setPage={()=>{}
   }
   length={0}  


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

export default SolicityContainer