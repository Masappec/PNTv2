import { Badge, Dropdown } from "flowbite-react";
import { FiCalendar } from "react-icons/fi";
import { CalendarYear } from "../../Common/CalendarYear";
import Alert from "../../Common/Alert";

interface GenerateAnualReportPresenterProps {
    onGenerateReport: (year: number) => void;
    onSelectYearAnualReport: (year: number) => void;
    yearAnualReport: number;
    error: string;
    success: string;
    setSuccess: (value: string) => void;
    setError: (value: string) => void;
    isLoading: boolean;
    onDownloadReport: () => void;
    isGenerated: boolean;
    isLoadingWorker: boolean;
}

export const GenerateAnualReportPresenter = (props: GenerateAnualReportPresenterProps) => {

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-md max-w-md w-full">
                <h1 className="text-2xl font-bold text-center">Generar Reporte Anual</h1>
                <h2 className="text-lg text-center text-gray-600">Seleccione el año y genere el reporte anual</h2>
                <div className="flex flex-col gap-4">
                    <Dropdown
                        label={
                            <>
                                <FiCalendar className="w-5 h-5 mr-2" />
                                Seleccionar año
                                <Badge className="ml-2" color="info">
                                    {props.yearAnualReport}
                                </Badge>
                            </>
                        }
                        size="md"
                        arrowIcon={false}
                        dismissOnClick
                        color="cyan"
                    >
                        <CalendarYear onSelect={props.onSelectYearAnualReport} />
                    </Dropdown>
                    <button className="text-white bg-primary hover:bg-primary-dark
                            focus:outline-none focus:ring-2 focus:ring-primary-dark
                            rounded-md px-4 py-2 border-2 w-full"
                        type="button"
                        onClick={() => props.onGenerateReport(props.yearAnualReport)}
                    >
                        Generar Reporte Anual {props.yearAnualReport}
                    </button>
                    {
                        props.isLoadingWorker &&
                        <div className="animate-pulse text-primary">
                            Estamos generando el reporte anual, 
                            te avisaremos cuando esté listo...
                        </div>
                    }
                    {
                        props.isGenerated &&
                        <button className="text-white bg-primary hover:bg-primary-dark
                            focus:outline-none focus:ring-2 focus:ring-primary-dark
                            rounded-md px-4 py-2 border-2 w-full"
                            type="button"
                            onClick={props.onDownloadReport}
                        >
                            Descargar Reporte Anual 
                        </button>
                    }
                </div>
                {props.isLoading && <div className="animate-pulse text-primary">Generando Reporte...</div>}
                {props.error && <Alert message={props.error} type="error" onClose={() => props.setError("")} />}
                {props.success && <Alert message={props.success} type="success" onClose={() => props.setSuccess("")} />}
            </div>
        </div>
    )
}