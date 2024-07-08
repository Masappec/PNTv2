import { useEffect, useState } from "react"
import FilePublicationPresenter from "./FilePublicationsPresenter"
import ReportsApi from "../../../../infrastructure/Api/Reports"
import { IReportRow } from "../../../../infrastructure/Api/Reports/interface"
import SessionService from "../../../../infrastructure/Services/SessionService";

interface Props {
    useCase: ReportsApi;
}


const FilePublicationContainer = (props: Props) => {

    const [solicitudes, SetSolicitudes] = useState<IReportRow[]>([])
    const [error, SetError] = useState<string>("")

    const [totalPage, setTotalPage] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [from, setFrom] = useState<number>(0)
    const [to, setTo] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [limitOptions,] = useState<number[]>([5, 10, 20, 40, 50])
    const establishment = SessionService.getEstablishmentData();

    useEffect(() => {

        props.useCase.getReport(new Date().getFullYear(), establishment.id||0,currentPage).then(response => {
            SetSolicitudes(response.results)
            setTotalPage(response.total_pages || 0)
            setFrom(response.from || 0)
            setTo(response.to)
            setTotal(response.total)
            setCurrentPage(response.current)
        }).catch((err) => {
            SetError(err.message)
        })
    }, [currentPage])

  



    const setPage = (page: number) => {
        setCurrentPage(page)
    }

    

    const onexport = () => {

        props.useCase.generateReportFiles(new Date().getFullYear(), establishment.id || 0).then(response => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'reporte-archivos-subidos.xlsx');
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        }).catch((err) => {
            SetError(err.message)
        })
            
    }

    

    return (
        <FilePublicationPresenter
            error={error}
            data={solicitudes}
            onExport={onexport}
            
            page={currentPage}

            setPage={setPage}
            from={from}
            to={to}
            total={total}
            totalPage={totalPage}
            limits={limitOptions}
            
        />
    )

}

export default FilePublicationContainer;