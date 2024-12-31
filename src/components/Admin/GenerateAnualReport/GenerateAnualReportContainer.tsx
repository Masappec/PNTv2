import { useEffect, useState } from "react";
import { AnualReportUseCase } from "../../../domain/useCases/AnualReportUseCase/AnualReportUseCase"
import { GenerateAnualReportPresenter } from "./GenerateAnualReportPresenter";
import SessionService from "../../../infrastructure/Services/SessionService";
import { useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/Store";
import { URL_API } from "../../../utils/constans";
import { TRANSPARENCY_PATH } from "../../../infrastructure/Api";
import { useDispatch } from "react-redux";
import { setAnualReports } from "../../../infrastructure/Slice/AnualReportSlice";

interface Props {
    usecase: AnualReportUseCase;
}
export const GenerateAnualReportContainer = (props: Props) => {
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isGenerated, setIsGenerated] = useState<boolean>(false);
    const _url_download_report = useSelector((state: RootState) => state.anualReport);
    const [url, setUrl] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [isLoaingWorker, setIsLoadingWorker] = useState<boolean>(false);
    const _isLoaingWorker = useSelector((state: RootState) => state.anualReport.isLoading);
    const _task_id = useSelector((state: RootState) => state.anualReport.task_id);
    const _progress = useSelector((state: RootState) => state.anualReport.progress);
    const _message = useSelector((state: RootState) => state.anualReport.message);
    const dispatch = useDispatch();

    useEffect(() => {
        if (_progress) {
            setProgress(_progress);
        }
    }, [_progress]);

    useEffect(() => {
        if (_message) {
            setMessage(_message);
        }
    }, [_message]);


    useEffect(() => {
        if(_task_id) {
            props.usecase.startWorker(_task_id);
        }
    }, [_task_id]);


    useEffect(() => {
        if (_isLoaingWorker) {
            setIsLoadingWorker(true);
        } else {
            setIsLoadingWorker(false);
        }
    }, [_isLoaingWorker]);

    useEffect(() => {
        if (_url_download_report?.anualReports?.length > 0) {
            setIsGenerated(true);
            setUrl(_url_download_report.anualReports);
        }else{
            setIsGenerated(false);
        }
    }, [_url_download_report]);


    const generateAnualReport = async (year: number) => {


        setIsLoading(true);
         props.usecase.generateAnualReport(year).then(res => {
            dispatch(setAnualReports(""));
            setIsLoading(false);
            if (res.task_status == "PENDING") {
                setSuccess("El Reporte Anual se está generando, Podrás descargarlo cuando esté listo.");
            } else if (res.task_status == "SUCCESS") {
                setSuccess("El Reporte Anual se ha generado correctamente.");
            } else if (res.task_status == "FAILURE") {
                setError("Ocurrió un error al generar el reporte anual.");
            } else {
                setError("Ocurrió un error inesperado.");
            }
        }).catch((err) => {
            setIsLoading(false);
            setError(err.message);
        });



    }

    const downloadReport = async () => {
        // Download the file
        
        const a = document.createElement('a');
        a.href = URL_API +TRANSPARENCY_PATH+url || '';
        a.download = `ReporteAnual-${selectedYear}.xlsx`;
        a.click();
        a.remove();
        SessionService.removeDownloadedReport();


    }


    return (
        <GenerateAnualReportPresenter
            onSelectYearAnualReport={setSelectedYear}
            yearAnualReport={selectedYear}
            onGenerateReport={generateAnualReport}
            error={error}
            success={success}
            isLoading={isLoading}
            setError={setError}
            setSuccess={setSuccess}
            onDownloadReport={downloadReport}
            isGenerated={isGenerated}
            progress={progress}
            message={message}
            isLoadingWorker={isLoaingWorker}
        />
    )

}