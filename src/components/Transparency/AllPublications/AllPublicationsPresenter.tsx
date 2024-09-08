import TransparencyActive from "../../../domain/entities/TransparencyActive"
import { FaFileCsv, FaFileExcel, FaFilePdf } from "react-icons/fa"
import Table from "../../Common/Table"
import TemplateFileUseCase from "../../../domain/useCases/TemplateFileUseCase/TemplateFileUseCase";
import TemplateService from "../../../infrastructure/Services/TemplateService";
import TemplateFileApi from "../../../infrastructure/Api/TemplateFile/TemplateFileApi";
import api from "../../../infrastructure/Api";
import { Transform } from "../../../utils/transform";
import axios from "axios";
import Spinner from "../../Common/Spinner";
import Alert from "../../Common/Alert";
import { useEffect, useState } from "react";


interface Props{
    data: TransparencyActive[];
    establishment:string;
    month:number;
    year:number;
    onChangeDate:(date:string)=>void
    loading: boolean;
    error:string;
    onCloseError:()=>void
}
const AllPublicationsPresenter = (props:Props)=>{
    const [current, setCurrent] = useState<string>("")

    const getCurrentDate = (month:number,year:number): string => {
        const currentDate = new Date();
        currentDate.setFullYear(year);
        currentDate.setMonth(month);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long'
        };
        return currentDate.toLocaleDateString(undefined, options);
    };

    useEffect(()=>{
        setCurrent(getCurrentDate(props.month-1,props.year))
    },[props.month,props.year])

    if (props.loading){
        return <Spinner/>
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
            TemplateUsecase.detectDelimiter(file,  (delim, text) => {
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
            TemplateUsecase.detectDelimiter(file,(delim, text) => {
                console.log(delim)

                Transform.fromCsvToXlxs(text, name)
            })
        } catch (e) {
            console.log(e)
        }
    }
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
                        <input
                            type="month"
                            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-8 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                            placeholder="Periodo"
                            onChange={(e) => props.onChangeDate(e.target.value)}
                        />

                    </div>


                </div>

            </section>
            {
                props.error!=""&&
                <Alert
                message={props.error}
                onClose={props.onCloseError}
                type="error"
                />
            }
            <Table<TransparencyActive>
                show={true}
                columns={[
                    {
                        render: (item) => {
                            return (
                                <p className="text-gray-900 dark:text-white text-base ">{item.numeralPartial?.name.toLocaleLowerCase().replace("numeral", "")}</p>
                            )
                        },
                        title: "#"
                    },
                    {
                        render: (item) => {
                            return (
                                <p className="text-gray-900 dark:text-white text-base">{item.numeralPartial?.description}</p>
                            )
                        },
                        title: "Numeral"
                    },
                    {
                        render: (item) => {
                            return (
                                <p className="text-gray-900 dark:text-white text-base">

                                    {new Date(item.published_at).toLocaleDateString()}

                                </p>
                            )
                        },
                        title: "Publicado"
                    },
                    {
                        render: (item) => {
                            return <div className="flex flex-row space-x-5">
                                {
                                    item.files.map((file, i) =>
                                        <div className="flex flex-col space-y-2" key={i}>
                                            <div key={i} className="grid grid-cols-3 ">
                                                <a key={i}
                                                    href={'#'}
                                                    onClick={() => onDownloadFile(file.url_download as string,
                                                        `${props.year}-${props.month}-${item.numeralPartial?.name}-${file.name}`
                                                    )}
                                                    className="text-primary-500 
                                                    hover:text-primary-600 text-base">
                                                    <FaFileCsv className="text-primary-500 
                                                    hover:text-primary-600 text-base ml-5"
                                                        size={30}
                                                    />


                                                </a>
                                                <a key={i}
                                                    href={'#'}
                                                    onClick={() => onDownLoadPdf(file.url_download as string,
                                                        `${props.year}-${props.month}-${item.numeralPartial?.name}-${file.name}`
                                                    )}
                                                    className="text-primary-500
                                                    hover:text-primary-600 text-base">
                                                    <FaFilePdf className="text-red-500 
                                                    hover:text-primary-600 text-base ml-5"
                                                        size={30}

                                                    />
                                                </a>
                                                <a key={i}
                                                    href={"#"}
                                                    onClick={() => onDonwloadXlsx(file.url_download as string,
                                                        `${props.year}-${props.month}-${item.numeralPartial?.name}-${file.name}`
                                                    )}
                                                    target="_blank"
                                                    className="text-primary-500
                                                    hover:text-primary-600 text-base"
                                                >
                                                    <FaFileExcel className="text-green-500" size={30}
                                                    />
                                                </a>



                                            </div>
                                            <div key={i} className="w-full justify-center items-center">
                                                {file.description}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                        },
                        title: "Archivos Publicados"
                    },
                ]}
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