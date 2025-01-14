import TransparencyActive, { StatusTransparency } from "../../../domain/entities/TransparencyActive"
import { FaCheck, FaFileCsv, FaFileExcel, FaFilePdf } from "react-icons/fa"
import Table, { Column } from "../../Common/Table"
import TemplateFileUseCase from "../../../domain/useCases/TemplateFileUseCase/TemplateFileUseCase";
import TemplateService from "../../../infrastructure/Services/TemplateService";
import TemplateFileApi from "../../../infrastructure/Api/TemplateFile/TemplateFileApi";
import api from "../../../infrastructure/Api";
import { Transform } from "../../../utils/transform";
import axios from "axios";
import Spinner from "../../Common/Spinner";
import Alert from "../../Common/Alert";
import MonthYearPicker from "../../Common/MonthYearPicker/MonthYearPicker";
import { useEffect, useState } from "react";
import { formatDate2 } from "../../../utils/functions";


interface Props {
    data: TransparencyActive[];
    establishment: string;
    month: number;
    year: number;
    onChangeDate: (date: string) => void
    loading: boolean;
    error: string;
    onCloseError: () => void
    approvePublication : (ta: TransparencyActive) =>void
    hasPermApp :boolean
}
const AllPublicationsPresenter = (props: Props) => {
    const [current, setCurrent] = useState<string>("")
    const [_columnsTable,setColumnsTable] = useState<Column<TransparencyActive>[]>([])
    const getCurrentDate = (month: number, year: number): string => {
        const currentDate = new Date();
        currentDate.setFullYear(year);
        currentDate.setMonth(month);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long'
        };
        return currentDate.toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        setCurrent(getCurrentDate(props.month - 1, props.year))
    }, [props.month, props.year])

    useEffect(()=>{

        if(props.hasPermApp){
            if (columnsTable.find(x =>x.title=="")==null){
                columnsTable.push(columnApprove)

            }
        }

        setColumnsTable(
            columnsTable
        )
    },[props.hasPermApp])

    if (props.loading) {
        return <Spinner />
    }






    const TemplateUsecase = new TemplateFileUseCase(new TemplateService(new TemplateFileApi(api)))



    const onDownloadFile = async (url: string, name: string) => {
        try {
            const res = await axios.get(url, {
                responseType: 'blob'
            })
            const blobUrl = window.URL.createObjectURL(new Blob([res.data]));
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = name + '.csv'
            a.click();
            window.URL.revokeObjectURL(blobUrl);
        } catch (e) {
            console.log(e)
        }
    }

    const onDownLoadPdf = async (url: string, name: string) => {
        try {
            const res = await axios.get(url, {
                responseType: 'blob'
            })

            const file = new File([res.data], name + '.csv', { type: 'text/csv' })
            TemplateUsecase.detectDelimiter(file, (delim, text) => {
                console.log(delim)
                Transform.fromCsvToPdfLandScape(text, name, props.establishment)
            })
        } catch (e) {
            console.log(e)
        }


    }

    const onDonwloadXlsx = async (url: string, name: string) => {
        try {
            const res = await axios.get(url, {
                responseType: 'blob'
            })

            const file = new File([res.data], name + '.csv', { type: 'text/csv' })
            TemplateUsecase.detectDelimiter(file, (delim, text) => {
                console.log(delim)

                Transform.fromCsvToXlxs(text, name)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const columnApprove: Column<TransparencyActive> = {

        render: (item) => {
            return item.status == StatusTransparency.APROVED ?
                (
                    <></>
                ) : (
                    <button

                        type='button'
                        onClick={() => props.approvePublication(item)}
                        className='inline-flex w-max items-center gap-2 rounded-md bg-white border border-primary 
                                    px-5 py-2.5 text-center text-sm font-medium text-primary hover:bg-primary hover:text-white'
                    >
                        <FaCheck className='text-primary ' />
                        <span>
                            Aprobar
                        </span>
                    </button>
                )
        },
        title: ""
    }

    const columnsTable: Column<TransparencyActive>[] = [
        {
            render: (item) => (
                <p className="text-left text-gray-900 dark:text-white text-base">
                    {item.numeralPartial?.name.toLocaleLowerCase().replace("numeral", "")} {item.numeralPartial?.description}
                </p>
            ),
            title: "Numeral",
        },
        {
            render: (item) => (
                <p className="text-gray-900 dark:text-white text-base">
                    {item.status !== StatusTransparency.APROVED
                        ? formatDate2(item.created_at.toISOString())
                        : formatDate2(item.published_at)}
                </p>
            ),
            title: "Publicado",
        },
        {
            render: (item) => {
                let files = item.files.map((file) => {
                    const description = file.description.replace(/\d/g, '').replace(".", '').trim();
                    return { ...file, description: description };
                });
    
                files = files.sort((a, b) => {
                    const order = ["Conjunto de datos", "Metadatos", "Diccionario"];
                    return order.indexOf(a.description) - order.indexOf(b.description);
                });
    
                return (
                    <div className="overflow-x-auto">
                        <div className="grid grid-flow-row-dense grid-cols-3 gap-x-1 gap-y-2 min-w-max">
                            {files.map((file, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center text-center space-y-4 p-4"
                                >
                                    <div className="flex space-x-6">
                                        {/* Ícono CSV */}
                                        <a
                                            href="#"
                                            onClick={() =>
                                                onDownloadFile(
                                                    file.url_download as string,
                                                    `${props.year}-${props.month}-${item.numeralPartial?.name}-${file.name}`
                                                )
                                            }
                                            className="text-primary-500 hover:text-primary-600"
                                        >
                                            <FaFileCsv size={30} className="text-primary-500" />
                                        </a>
                                        {/* Ícono PDF */}
                                        <a
                                            href="#"
                                            onClick={() =>
                                                onDownLoadPdf(
                                                    file.url_download as string,
                                                    `${props.year}-${props.month}-${item.numeralPartial?.name}-${file.name}`
                                                )
                                            }
                                            className="text-red-500 hover:text-primary-600"
                                        >
                                            <FaFilePdf size={30} className="text-red-500" />
                                        </a>
                                        {/* Ícono XLS */}
                                        <a
                                            href="#"
                                            onClick={() =>
                                                onDonwloadXlsx(
                                                    file.url_download as string,
                                                    `${props.year}-${props.month}-${item.numeralPartial?.name}-${file.name}`
                                                )
                                            }
                                            className="text-green-500 hover:text-primary-600"
                                        >
                                            <FaFileExcel size={30} className="text-green-500" />
                                        </a>
                                    </div>
                                    {/* Descripción con tamaño uniforme */}
                                    <p
                                        className="text-sm max-w-[150px] truncate"
                                        title={file.description} // Mostrar el texto completo al pasar el cursor
                                    >
                                        {file.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                );                
            },
            title: "Archivos Publicados",
        },
    ];    

    
    return (
        <>
            <section className="flex border-b border-gray-300">

                <h2 className='mb-4 text-balance  pb-1 text-2xl font-bold text-primary'>
                    Publicaciones T. Activa | {current}

                </h2>

            </section>
            <section className='mb-8 m-2 flex flex-col gap-4 sm:flex-row sm:items-center'>

                <div className='flex flex-row gap-2'>

                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-500 text-sm'>
                            Periodo
                        </label>
                        <MonthYearPicker
                            onChangeDate={(date) => props.onChangeDate(date)}
                        />
                    </div>


                </div>

            </section>
            {
                props.error != "" &&
                <Alert
                    message={props.error}
                    onClose={props.onCloseError}
                    type="error"
                />
            }
            <Table<TransparencyActive>
                show={true}
                columns={_columnsTable}
                data={props.data}
                description="No se encontraron resultados"
                length={props.data.length}
                onFilter={() => { }}
                search=""
                title=""
                currentPage={1}
                from={1}
                isImport={false}
                key={0}
                onChangePage={() => { }}
                onImport={() => { }}
                to={props.data.length}
                total={props.data.length}
            />
        </>
    )
}

export default AllPublicationsPresenter;
